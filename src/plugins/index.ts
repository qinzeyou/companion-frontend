import {setupStore} from "@/stores";
import type {App} from 'vue';
import {setupRouter} from "@/router";

// 安装插件
export default {
    install(app: App<Element>) {
        // 状态管理(store)
        setupStore(app);
        // 路由(router)
        setupRouter(app);
    }
}
