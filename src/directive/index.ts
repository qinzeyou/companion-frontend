import type {App} from 'vue';
import {loadMore} from "@/directive/load-more.ts";
import {lazyImg} from "@/directive/lazy.ts";

// 全局注册 directive
export function setupDirective(app: App<Element>) {
    app.directive('loadMore', loadMore);
    app.directive('lazy-img', lazyImg);
}
