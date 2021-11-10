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
    const regForm = reactive({ // reactive定义响应式数据的集合
      account: '',
      password: '',
    });

    const register = () => { // 注册的时候做的事情
    //   console.log(regForm);
      auth.register(regForm.account, regForm.password); // 调用了auth下面的register发送了一个http请求,带过去一个账户和密码
    };

    return {
      regForm, // 返回表单数据

      register, // 返回方法
    };
  },
});
