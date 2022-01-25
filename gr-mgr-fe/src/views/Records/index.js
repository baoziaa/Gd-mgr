import { defineComponent, ref, onMounted } from 'vue'; // todo defineComponentd代码提示
import { message, Modal} from 'ant-design-vue';
import { record } from '@/service';
import {useRouter} from 'vue-router'; //操作路由的一些方法,例前进页/后退页/跳到某一页
import { result, formatTimestamp } from '@/helpers/utils'
import AddOne from './AddOne/index.vue';//引入AddOne,然后再component里进行注册
import Update from './Update/index.vue';//引入Update,然后再component里进行注册

export default defineComponent({
  components: { // 进行注册
    AddOne,
    Update,
  },
  setup() {
    const router = useRouter();

    const columns = [
      {
        title: '学号',
        dataIndex: 'stuid',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: '专业',
        dataIndex: 'major',
      },
      {
        title: '班级',
        dataIndex: 'gclass',
      },
      {
        title: '毕业日期',
        dataIndex: 'graddate',
        slots: {
          customRender: 'graddate',
        },
      },
      {
        title: '毕业去向',
        dataIndex: 'grad',
      },
      {
        title: '去向城市',
        dataIndex: 'city',
      },
      {
        title: '单位名称',
        dataIndex: 'unitname',
      },
      {
        title: '单位性质',
        dataIndex: 'nature',
      },
      {
        title: '单位行业',
        dataIndex: 'industry',
      },
      {
        title: '所在地址',
        dataIndex: 'location',
      },
      {
        title: '毕业薪资',
        dataIndex: 'salary',
      },
      {
        title: '联系电话',
        dataIndex: 'tel',
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions',
        },
      },
    ]; // 它是一个数组,每一项代表每一列的配置项


    const show = ref(false);
    const showUpdateModel = ref(false);
    
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const keyword = ref('');
    const isSearch = ref(false);
    const curEditRecord = ref({});

    // 获取数据列表
    const getList = async () => {
      const res = await record.list({
        page:curPage.value,
        size: 10,
        keyword:keyword.value,
      });
      // console.log(res);
      result(res)
        .success(({data}) => {
          // console.log(data);
          const {
            list: l, //重命名为l
            total: t,
          } = data;
          list.value = l;
          total.value = t;
          // console.log(list.value)
        });
    };

    onMounted(async () => {
      getList();
    });

    // 设置页码/切页
    const setPage = (page) => {
      curPage.value = page;

      getList();
    };
    
    // 触发搜索
    const onSearch = () => {
      getList();
      // isSearch.value = true;解决搜索后删除文本内容,返回标签还在的情况下
      isSearch.value = Boolean(keyword.value);
    };

    // 返回全部列表
    const backAll = () => {
      keyword.value = '',
      getList();
      isSearch.value = false;
    };


    // 删除一条数据
    const remove = async ({ text: arecord }) => {
      // 从每一条记录中拿到id
      const { _id } = arecord;
      // 把id传递给axios方法,发送请求,服务端删除之后返回一些数据返回给res
      const res = await record.remove(_id);
      // 处理返回的数据
      result(res)
        .success(({ msg }) => { //响应成功的时候做出的反应
          message.success(msg);
          // 找到下标
          // const idx = list.value.findIndex((item) => {
          //   return item._id === _id;
          // });
          // 进行删除1个
          // list.value.splice(idx, 1);
          // 为了保证数据的完整性,我买选择用getList获取新的数据列表
          getList();
        });
    };


    const confirmBox = arecord => {
      Modal.confirm({
        title: '您确认删除这条信息吗?',
        onOk: async () => {
          remove(arecord);
        }
      });
    };

    // 显示更新弹框
    const update = arecord => {
      showUpdateModel.value = true;
      curEditRecord.value = arecord;
    };

    // 更新列表的某一行数据
    const updateCurRecord = (newData) => {
      Object.assign(curEditRecord.value,newData);
    };

    // 进入详情页
    const toDetail = arecord => {
      // console.log(arecord.record._id);
      router.push(`/records/${arecord.record._id}`);
    };

    return {
      columns,
      show,
      list,
      formatTimestamp,
      curPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      isSearch,
      confirmBox,
      showUpdateModel,
      update,
      curEditRecord,
      updateCurRecord,
      toDetail,
    };
  },
});
