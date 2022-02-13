import { defineComponent, onMounted, ref } from 'vue';
import { DestinationClassifiy } from '@/service';
import { result } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';

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

    const confirmBox = record => {
      Modal.confirm({
        title: '您确认删除这条分类信息吗?',
        onOk: () => {
          remove(record);
        }
      });
    };

    const updateTitle = async ({ _id }) => {
      Modal.confirm({
        title: "请输入新的去向分类名称",
        content: (
          <div>
            <Input class="__destination_classifiy_title" />
          </div>
        ),
        onOk: async () => {
          // 取到Input框的el值
          const title = document.querySelector(".__destination_classifiy_title");

          const res = await DestinationClassifiy.updateTitle(_id, title);

          result(res)
            .success(({ msg }) => {
              message.success(msg);
              getList();
            });

        }
      });
    };

    return {
      add,

      list,
      title,
      columns,
      confirmBox,
      updateTitle
    }
    
  },
});