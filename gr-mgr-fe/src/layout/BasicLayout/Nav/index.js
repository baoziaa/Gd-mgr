import { defineComponent, ref,onMounted } from 'vue'; // defineComponent导出代码的时候有很好的代码提示
import {useRouter, useRoute} from 'vue-router';
import menu from '@/config/menu'; //引入Nav的title列表进行渲染

export default defineComponent({
  setup () {
    const router = useRouter();
    const route = useRoute();

    const openKeys = ref([]);
    const selectedKeys = ref([]);

    onMounted(() => {
      selectedKeys.value = [route.path];
      // console.log(route);
    });

    const to = (url) => {
      router.push(url);
    };

    return {
      openKeys,
      selectedKeys,
      menu,
      to,
    };
  },
});
