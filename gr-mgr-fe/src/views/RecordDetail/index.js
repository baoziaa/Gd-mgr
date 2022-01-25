import { defineComponent, onMounted, ref } from 'vue';
import {useRoute, useRouter} from 'vue-router'; //指当前页面跟路由相关的信息,例:url里面的参数有哪些
import { result, formatTimestamp, formatTimestampDetail } from '@/helpers/utils'
import { record } from '@/service';
import { message, Modal } from 'ant-design-vue';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import Update from '@/views/Records/Update/index.vue';


export default defineComponent({
  components: {
    Update,
    DeleteOutlined,
    FormOutlined,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const { id: _id } = route.params;
    
    const detailInfo = ref({});
    const detailInfoSetUp = ref({});
    
    const showUpdateModel = ref(false);

    const curLogType = ref('EDIT_RECORD');

    const getDetail = async () => {
      const res = await record.detail(_id);

      result(res)
        .success(({data}) => {
          // console.log(formatTimestamp(data.meta.createdAt));
          detailInfo.value = data;
          detailInfoSetUp.value = data.meta;
        });
    };
    
    // 当页面挂载时
    onMounted(() => {
      getDetail();
    });

    const update = (record) => {
      Object.assign(detailInfo.value,record);
    };


    // 删除
    const remove = async () => {
      const res = await record.remove(_id);
      result(res)
        .success(({ msg }) => {
          message.success(msg);
          // 删除当前路由跳转到/records路由
          router.replace('/records');
        });
    };

    // 删除提示框
    const confirmBox = () => {
      Modal.confirm({
        title: '您确认删除这条信息吗?',
        onOk: async () => {
          remove();
        }
      });
    };



    const logFilter = (type) => {
      curLogType.value = type;
    }
    
    return {
      detailInfo,
      su: detailInfoSetUp, //重命名为su
      formatTimestamp,
      formatTimestampDetail,
      confirmBox,
      showUpdateModel,
      update,
      logFilter,
      curLogType,
    };

  },

});