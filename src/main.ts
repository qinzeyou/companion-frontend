import {createApp} from 'vue'
import App from './App.vue'
// 1. 引入你需要的组件
import { NavBar, Icon } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

// router
import router from "@/router";

const app = createApp(App)
app.use(router);
app.use(NavBar)
app.use(Icon)
app.mount('#app')
