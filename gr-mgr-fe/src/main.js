import { createApp, VueElement } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import SpaceBetween from './components/SpaceBetween/index.vue';
import FlexEnd from './components/FlexEnd/index.vue';
import { regDirectives } from '@/helpers/directive';


const app = createApp(App)


regDirectives(app);



app
  .use(store)
  .use(router)
  .use(Antd)
  .component('space-between', SpaceBetween)
  .component('space-end', FlexEnd)
  .mount('#app');
