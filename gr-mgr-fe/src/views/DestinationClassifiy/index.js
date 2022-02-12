import { defineComponent, onMounted, ref } from 'vue';
import { DestinationClassifiy } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';

const columns = [
  {
    title: '分类',
    dataIndex: 'title',
  },
  {
    title: '操作',
    slots: {
      customRender: 'actions',
    },
  },
];


export default defineComponent({
  setup() {

    const title = ref('');
    const list = ref([]);

    const getList = async () => {
      const res = await DestinationClassifiy.list();

      result(res)
        .success(({data}) => {
          list.value = data;
        });
      
    };
    
    const add = async () => {
      const res = await DestinationClassifiy.add(title.value);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getList();
          title.value = '';
        });
    };

    onMounted(() => {
      getList();
    });

    const remove = async ({ _id }) => {
      const res = await DestinationClassifiy.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          getList();
        });
    };

    return {
      add,

      list,
      title,
      columns,
      remove,
    }
    
  },
});