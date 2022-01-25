import { defineComponent, ref, onMounted } from 'vue';
import { user } from '@/service';
import { result, formatTimestampDetail } from '@/helpers/utils';
import { message, Modal } from 'ant-design-vue';
import AddOne from './AddOne/index.vue';

const columns = [
  {
    title: '账户',
    dataIndex: 'account'
  },
  {
    title: '创建日期',
    slots: {
      customRender: 'createdAt'
    },
  },
  {
    title: '操作',
    slots: {
      customRender: 'actions'
    },
  },
];



export default defineComponent({
  components: {
    AddOne,
  },
  setup() {
    // 存放用户信息
    const list = ref([]);
    // 总数默认0条
    const total = ref(0);
    // page默认第一页
    const curPage = ref(1);
    // 添加用户的弹框
    const showAddModel = ref(false);
    // 搜索关键词keyword
    const keyword = ref('');
    // 搜索状态
    const isSearch = ref(false);

    const getUser = async () => {
      const res = await user.list(curPage.value, 3, keyword.value); //默认size先写死3条

      result(res)
        .success(({ data: {list: reslist, total: restotal} }) => {
          list.value = reslist;
          total.value = restotal;
        });
    };

    onMounted(() => {
      getUser();
    });
    
    const remove = async ({ _id }) => {
      const res = await user.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          // 获取一下用户列表
          getUser();
        });
    };

    const confirmBox = record => {
      Modal.confirm({
        title: '您确认删除这条信息吗?',
        onOk: async () => {
          remove(record);
        }
      });
    };

    const setPage =  (page) => {
      curPage.value = page;
      getUser();
    };

    const resetPassword = async ({ _id }) => {
      const res = await user.resetPassword(_id);

      result(res)
        .success(({msg}) => {
          message.success(msg);
        })
    };

    const onSearch = () => {
      getUser();
      isSearch.value = !!keyword.value; //把keyword转换为Boolean类型

    };

    const backAll = () => {
      getUser();
      isSearch.value = false;
      keyword.value = '';
    };

    return {
      list,
      total,
      curPage,
      columns,
      formatTimestampDetail,
      remove,
      showAddModel,
      confirmBox,
      getUser,
      setPage,
      resetPassword,
      keyword,
      onSearch,
      backAll,
      isSearch,
    };
  },
  
});