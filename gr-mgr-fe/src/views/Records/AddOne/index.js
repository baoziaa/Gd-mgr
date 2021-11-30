import { defineComponent,reactive } from "vue";
import { record } from "@/service"; //导入进来
import { message } from 'ant-design-vue'
import { result ,clone } from '@/helpers/utils';

const defaultFormData = {
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
  tel: '',
}

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props,context) {
    // console.log(props);
    const addForm = reactive(clone(defaultFormData));

    const submit = async () => {
      const from = clone(addForm); //复制一下这个表单,拷贝一份
      from.graddate = addForm.graddate.valueOf(); //addForm.graddate.valueOf()获取到时间戳之后在传递给add方法
      const res = await record.add(from); //导入进来就可以调用方法

      result(res) //d代表成功时候的响应
        .success((d,{ data }) => { //成功的时候做出的反应,把defaultFormData合并到addForm,达到清空表单的一个效果
          Object.assign(addForm,defaultFormData);
          message.success(data.msg);
        });
    };

    const close = () => {
      context.emit('update:show',false);
    };

    return {
      addForm,
      submit,
      props,
      close,
    };
  },
});