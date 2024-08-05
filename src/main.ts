import {createApp} from 'vue'
import App from './App.vue'
// 样式重置文件
import "@/assets/css/reset.scss";
// 引入组件样式
import 'vant/lib/index.css';
// 引入vant组件的css
import 'vant/es/toast/style';
import 'vant/es/notify/style'
// 自定义注册依赖插件
import setupPlugins from "@/plugins";

const app = createApp(App);
app.use(setupPlugins);
app.mount('#app')
