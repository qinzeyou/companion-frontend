import {createApp} from 'vue'
import App from './App.vue'
// 样式重置文件
import "@/assets/css/reset.scss";
// 引入组件样式
import 'vant/lib/index.css';
// 引入vant组件的css
import 'vant/es/toast/style';
import 'vant/es/notify/style';
import 'vant/es/dialog/style';
// 自定义注册依赖插件
import setupPlugins from "@/plugins";
// 引入全局CSS样式文件
import "@/assets/css/index.scss";

const app = createApp(App);
app.use(setupPlugins);
app.mount('#app')
