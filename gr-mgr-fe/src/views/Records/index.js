import { defineComponent, ref,onMounted } from 'vue'; // todo defineComponentd代码提示
import { record } from '@/service';
import { result,formatTimestamp } from '@/helpers/utils'
import AddOne from './AddOne/index.vue';//引入AddOne,然后再component里进行注册

export default defineComponent({
  components: { // 进行注册
    AddOne,
  },
  setup() {
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
        title: '单位所在地',
        dataIndex: 'location',
      },
      {
        title: '联系电话',
        dataIndex: 'tel',
      },
    ]; // 它是一个数组,每一项代表每一列的配置项


    const show = ref(false);
    
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);

    const getList = async () => {
      const res = await record.list({
        page:curPage.value,
        size: 10,
      });
      // console.log(res);
      result(res)
        .success(({data}) => {
          console.log(data);
          const {
            list: l,
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

    const setPage = (page) => {
      curPage.value = page;

      getList();
    }
    
    return {
      columns,
      show,
      list,
      formatTimestamp,
      curPage,
      total,
      setPage,
    };
  },
});
