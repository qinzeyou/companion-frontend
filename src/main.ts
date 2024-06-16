import {createApp} from 'vue'
import App from './App.vue'
// 样式重置文件
import "@/assets/css/reset.scss";

// 1. 引入你需要的组件
import Vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

// router
import router from "@/router";

const app = createApp(App)
app.use(router);
app.use(Vant);
app.mount('#app')
