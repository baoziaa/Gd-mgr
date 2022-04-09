import { defineComponent, onMounted, ref } from 'vue';
import { MessageBoard } from '@/service';
import { result, formatTimestampDetail} from '@/helpers/utils';
import { message, Modal, textarea } from 'ant-design-vue';
import StyleOther from './index.scss';
import store from '@/store';


const columns = [
  {
    title: '留言内容',
    dataIndex: 'substance',
  },
  {
    title: '创建时间',
    slots: {
      customRender: 'CreateTime',
    },
  },
/*   {
    title: '操作',
    slots: {
      customRender: 'actions',
    },
  }, */
];


export default defineComponent({
  props: {
    hide: Boolean,
  },
  setup(props) {

    // 拿到角色列表
    const { userInfo, characterInfo } = store.state;
    
    // console.log(characterInfo[0]._id,userInfo.character);

    // 如果当前登录的是管理员就push到列表里面
    if (characterInfo[0]._id === userInfo.character) {
      columns.push(
        {
          title: '操作',
          slots: {
            customRender: 'actions',
          },
        },
      );
    }
   // 总数默认0条
    const total = ref(0);
    // page默认第一页
    const curPage = ref(1);

    const substance = ref('');
    const list = ref([]);

    const getList = async () => {
      const res = await MessageBoard.list(curPage.value, 10);

      result(res)
        .success(({ data: {list: reslist, total: restotal} }) => {
          list.value = reslist;
          total.value = restotal;
        });
    };
    
    
    const add = async () => {
      const res = await MessageBoard.add(substance.value);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getList();
          substance.value = '';
        });
    };

    onMounted(() => {
      getList();
    });

    const remove = async ({ _id }) => {
      const res = await MessageBoard.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          getList();
        });
    };

    // 设置分页跳转
    const setPage =  (page) => {
      console.log(page);
      curPage.value = page;
      
      getList();
    };

    const confirmBox = record => {
      Modal.confirm({
        title: '您确认删除这条留言信息吗?',
        onOk: () => {
          remove(record);
        }
      });
    };

    const updateSubstance = async ({ _id }) => {
      Modal.confirm({
        title: "请输入新的留言内容",
        content: (
          <div>
            <textarea style="width:100%;height:120px;border:1px solid #eee;" class="__destination_classifiy_title" />
          </div>
        ),
        onOk: async () => {
          // 取到Input框的el值
          const substance = document.querySelector(".__destination_classifiy_title");

          const res = await MessageBoard.updateSubstance(_id, substance.value);

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
      total,
      curPage,
      setPage,
      list,
      substance,
      columns,
      confirmBox,
      updateSubstance,
      formatTimestampDetail,
      hide: props.hide,
    }
    
  },
}); 