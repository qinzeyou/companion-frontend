import {createApp} from 'vue'
import App from './App.vue'
// 样式重置文件
import "@/assets/css/reset.scss";

import setupPlugins from "@/plugins";

const app = createApp(App)
app.use(setupPlugins);
app.mount('#app')
