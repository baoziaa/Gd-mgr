import { defineComponent } from 'vue'
import { UserOutlined,LockOutlined,MailOutlined} from '@ant-design/icons-vue'
// 用这个组件包一下defineComponent写配置项有提示,鼠标移上去会对这个属性有提示
export default defineComponent ({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() { //组件初始化的时候会执行一次

  },
});