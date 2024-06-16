import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import("@/layouts/BasicLayout.vue"),
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () => import("@/pages/home/HomeIndex.vue")
            },
            {
                path: 'team',
                component: () => import("@/pages/team/TeamIndex.vue")
            },
            {
                path: 'user',
                component: () => import("@/pages/user/UserIndex.vue")
            },
            {
                path: 'search',
                component: () => import("@/pages/search/SearchIndex.vue")
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
