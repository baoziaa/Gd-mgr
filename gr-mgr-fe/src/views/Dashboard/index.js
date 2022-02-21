import { defineComponent, onMounted, ref } from 'vue';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import { dashboard } from '@/service';
import Record from '../Records/index.vue';
import Log from '../Log/index.vue';


export default defineComponent({
  components: {
    Record,
    Log,
  },
  setup() {
    // 设置loading加载状态
    const loading = ref(true);
    
    const baseInfo = ref({
      total: {
        record: 0,
        user: 0,
        log: 0,
      },
    });
    
    const getBashInfo = async () => {
      loading.value = true;
      const res = await dashboard.baseInfo();
      loading.value = false;

      result(res)
        .success(({ data, msg }) => {
          baseInfo.value = data;
          message.success(msg);
        });
      
    };

    onMounted(() => {
      getBashInfo();
    });


    return {
      baseInfo,
      loading,
    };
    
  },
});