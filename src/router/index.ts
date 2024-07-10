import {createRouter, createWebHistory} from "vue-router";
import {App} from "vue";

const routes = [
    {
        path: '/',
        component: () => import("@/layouts/base-layout.vue"),
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import("@/pages/home/home-index.vue")
            },
            {
                path: '/team',
                component: () => import("@/pages/team/team-index.vue")
            },
            {
                path: '/team/add',
                component: () => import("@/pages/team/team-operation/team-add.vue")
            },
            {
                path: '/search',
                component: () => import("@/pages/search/search-index.vue")
            },
            {
                path: '/search/result',
                component: () => import("@/pages/search/search-result.vue")
            },
            {
                path: '/user',
                component: () => import("@/pages/user/user-home/user-home.vue")
            },
            {
                path: '/user/edit',
                component: () => import("@/pages/user/user-edit/user-edit.vue")
            },
            {
                path: '/user/team/manager',
                component: () => import("@/pages/user/user-team/user-team-manager.vue")
            },
            {
                path: '/information',
                component: () => import("@/pages/information/information-index.vue")
            },
        ]
    },
    {
        path: '/login',
        component: () => import("@/pages/other/login.vue")
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// 全局注册路由
export function setupRouter(app: App<Element>) {
    app.use(router);
}

export default router
