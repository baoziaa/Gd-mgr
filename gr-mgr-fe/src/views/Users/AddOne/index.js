import { defineComponent,reactive } from "vue";
import { user } from "@/service"; //导入进来
import { message } from 'ant-design-vue'
import { result ,clone } from '@/helpers/utils';
import { emit } from "process";

const defaultFormData = {
  account: '',
  password: '',
}

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props,context) {
    // console.log(props);
    const addForm = reactive(clone(defaultFormData));

    const close = () => {
      context.emit('update:show',false);
    };

    const submit = async () => {
      const form = clone(addForm); //复制一下这个表单,拷贝一份
      
      const res = await user.add(form.account,form.password); //导入进来就可以调用方法

      result(res) //d代表成功时候的响应
        .success((d,{ data }) => { //成功的时候做出的反应,把defaultFormData合并到addForm,达到清空表单的一个效果
          Object.assign(addForm,defaultFormData);
          message.success(data.msg);
          close();
          context.emit('getList');
        });
    };

    

    return {
      addForm,
      submit,
      props,
      close,
    };
  },
});