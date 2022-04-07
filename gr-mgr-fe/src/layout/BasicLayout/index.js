import { defineComponent } from 'vue'; // defineComponent导出代码的时候有很好的代码提示
import { setToken } from '@/helpers/token';
import Nav from './Nav/index.vue'; // 不加index.vue默认引入index.js
import store from '@/store';


export default defineComponent({
  components: { // 注册
    AppNav: Nav,
  },
  setup() {
    const logout = () => {
      setToken('');

      // 将路由重定向到/
      window.location.href = '/';
    };

    
    // 拿到角色列表
    const { userInfo } = store.state;

    return {
      logout,
      userInfo : userInfo.account,

    };
  },
});
