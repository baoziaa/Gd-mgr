import { defineComponent, reactive } from 'vue';
import { profile } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const resetPasswordFrom = reactive({
      // 原始密码
      oldPassword: '',
      // 新密码
      newPassword: '',
      // 确认密码
      confirmNewPassword: '',
    });

    const resetPassword = async () => {
      if (resetPasswordFrom.confirmNewPassword !== resetPasswordFrom.newPassword) {
        message.error('两次输入密码不一致!');
      }

      const res = await profile.resetPassword(
        resetPasswordFrom.newPassword,
        resetPasswordFrom.oldPassword,
      );

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          resetPasswordFrom.oldPassword = '';
          resetPasswordFrom.newPassword = '';
          resetPasswordFrom.confirmNewPassword = '';

        });
      
    };

    return{
      resetPasswordFrom,
      resetPassword,
    };
  },
});