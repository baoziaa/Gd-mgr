import { defineComponent, reactive, ref } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth } from '@/service';

// 用这个组件包一下defineComponent写配置项有提示,鼠标移上去会对这个属性有提示
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() { // 组件初始化的时候会执行一次
		//注册用的表单数据
    const regForm = reactive({ // reactive定义响应式数据的集合
      account: '',
      password: '',
    });
		// 注册逻辑
    const register = () => { // 注册的时候做的事情
    //   console.log(regForm);
      auth.register(regForm.account, regForm.password); // 调用了auth下面的register发送了一个http请求,带过去一个账户和密码
    };
		//登录用的表单数据
	const loginForm = reactive({ // reactive定义一组响应式数据的集合
      account: '',
      password: '',
    });
		//登录逻辑
    const login = () => {
		auth.login(loginForm.account, loginForm.password);
    };

    return {
			//注册相关的数据
      regForm, // 返回表单数据
      register, // 返回方法

			//登录相关的数据
			loginForm,
			login,
    };
  },
});
