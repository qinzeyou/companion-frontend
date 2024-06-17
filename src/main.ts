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

// 封装的axios实例
import request from "@/api/base/base-axios.ts";

const app = createApp(App)

// 挂载变量
// 将封装好的axios实例挂载到vue原型链上，到时候可以直接通过原型来引用封装的axios实例
app.config.globalProperties.$request = request;

app.use(router);
app.use(Vant);
app.mount('#app')
