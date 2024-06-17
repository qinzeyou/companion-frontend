import {createRouter, createWebHistory} from "vue-router";

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
                path: '/user',
                component: () => import("@/pages/user/user-home/user-home.vue")
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
                path: '/user-edit',
                component: () => import("@/pages/user/user-edit/user-edit.vue")
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
