import { defineComponent, ref,onMounted } from 'vue'; // defineComponent导出代码的时候有很好的代码提示
import {useRouter, useRoute} from 'vue-router';
import menu from '@/config/menu'; //引入Nav的title列表进行渲染

export default defineComponent({
  setup () {
    // 是全局路由的实例
    const router = useRouter();
    // 表示当前的路由信息,包含了当前URL解析得到的信息
    const route = useRoute();
    // 控制二级菜单是否展开
    const openKeys = ref(['杂项']);
    // 当前选中的菜单项 key 数组
    const selectedKeys = ref([]);

    onMounted(() => {
      selectedKeys.value = [route.path];
      // console.log(route);
      menu.forEach((item) => {
        (item.children || []).forEach((child) => {
          if (child.url === route.path) {
            openKeys.value.push(item.title);
          }
        });
      });
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
