import { defineComponent } from 'vue'; // defineComponent导出代码的时候有很好的代码提示
import { setToken } from '@/helpers/token';
import Nav from './Nav/index.vue'; // 不加index.vue默认引入index.js

export default defineComponent({
  components: { // 注册
    AppNav: Nav,
  },
  setup() {
    const logout = () => {
      setToken('');

      window.location.href = '/';
    };

    return {
      logout,
    };
  },
});
