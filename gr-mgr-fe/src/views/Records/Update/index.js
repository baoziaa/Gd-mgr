import { defineComponent,reactive, watch} from "vue";
import { record } from "@/service"; //导入进来
import { message } from 'ant-design-vue'
import { result ,clone } from '@/helpers/utils';
import moment from "moment";


export default defineComponent({
  props: {
    show: Boolean,
    record: Object,
  },
  setup(props,context) {
    // console.log(props);
    const editForm = reactive({
      stuid: '',
      name: '',
      sex: '',
      major: '',
      gclass: '',
      graddate: 0,
      grad: '',
      city: '',
      unitname: '',
      nature: '',
      industry: '',
      location: '',
      salary: '',
      tel: '',
    });

    const close = () => {
      context.emit('update:show',false);
    };

    watch(() => props.record, (current) => {
      // 把当前点击的这条数据合并到表单上
      Object.assign(editForm,current.record);
      // 把日期利用moment进行转化成moment对象型
      editForm.graddate = moment(Number(editForm.graddate));
    });

    const submit = async () => {
      const res = await record.update({
        id: props.record._id,
        ...editForm,
        graddate: editForm.graddate.valueOf(),
      });

      result(res)
      .success(({ data, msg }) => { //拿到msg进行响应
        context.emit('update',data);
        message.success(msg);
        close();
        // Object.assign(props.record, data);子组件直接修改父组件提供的props,不推荐
      });
    };

    return {
      editForm,
      submit,
      props,
      close,
    };
  },
});