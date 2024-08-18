import {setupStore} from "@/stores";
import type {App} from 'vue';
import {setupRouter} from "@/router";
import {setupDirective} from "@/directive";

// 安装插件
export default {
    install(app: App<Element>) {
        // 状态管理(store)
        setupStore(app);
        // 路由(router)
        setupRouter(app);
        // 自定义指令
        setupDirective(app);
    }
}
