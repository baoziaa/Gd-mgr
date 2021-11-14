import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { result } from '../../helpers/utils';
import { auth } from '@/service';

// 用这个组件包一下defineComponent写配置项有提示,鼠标移上去会对这个属性有提示
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() { // 组件初始化的时候会执行一次
    // 注册用的表单数据
    const regForm = reactive({ // reactive定义响应式数据的集合
      account: '',
      password: '',
      inviteCode: '',
    });
    // 注册逻辑
    const register = async () => { // 注册的时候做的事情
    //   console.log(regForm);
      if (regForm.account === '') { // 账户为空的时候弹框
        message.info('请输入账户');
        return;
      }

      if (regForm.password === '') { // 密码为空的时候弹框
        message.info('请输入密码');
        return;
      }

      if (regForm.inviteCode === '') { // 邀请码为空的时候弹框
        message.info('请输入邀请码');
        return;
      }
      // res 是 response的缩写 响应 res.data = { data } 通过结构的方式去拿到data
      // 调用了auth下面的register发送了一个http请求,带过去一个账户、密码和邀请码
      const res = await auth.register(
        regForm.account,
        regForm.password,
        regForm.inviteCode,
      );

      result(res) // 调用result函数,传递给它一个res
        .success((data) => {
          message.success(data.msg);
        })
        .fail((data) => {
          message.error(data.msg);
        });
      // console.log(res);
    };
    // 登录用的表单数据
    const loginForm = reactive({ // reactive定义一组响应式数据的集合
      account: '',
      password: '',
    });
    // 登录逻辑
    const login = async () => {
      if (loginForm.account === '') { // 账户为空的时候弹框
        message.info('请输入账户');
        return;
      }

      if (loginForm.password === '') { // 密码为空的时候弹框
        message.info('请输入密码');
        return;
      }

      const res = await auth.login(loginForm.account, loginForm.password);

      result(res)
        .success((data) => {
          message.success(data.msg);
        });
    };

    return {
      // 注册相关的数据
      regForm, // 返回表单数据
      register, // 返回方法

      // 登录相关的数据
      loginForm,
      login,
    };
  },
});
