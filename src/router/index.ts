import { createRouter, createWebHistory } from "vue-router";
import { App } from "vue";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/base-layout.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/pages/home/home-index.vue"),
        meta: {
          title: "主页",
          keepAlive: true, //设置页面是否需要使用缓存
        },
      },
      {
        path: "/team",
        component: () => import("@/pages/team/team-index.vue"),
        meta: {
          title: "队伍",
        },
      },
      {
        path: "/team/add",
        component: () => import("@/pages/team/team-operation/team-add.vue"),
        meta: {
          title: "创建队伍",
        },
      },
      {
        path: "/search",
        component: () => import("@/pages/search/search-index.vue"),
        meta: {
          title: "搜索用户",
        },
      },
      {
        path: "/search/result",
        component: () => import("@/pages/search/search-result.vue"),
        meta: {
          title: "搜索结果",
        },
      },
      {
        path: "/user",
        component: () => import("@/pages/user/user-home/user-home.vue"),
        meta: {
          title: "个人",
        },
      },
      {
        path: "/show/userInfo",
        component: () => import("@/components/show-user-info.vue"),
        meta: {
          title: "用户信息",
        },
      },
      {
        path: "/user/edit",
        component: () => import("@/pages/user/user-edit/user-edit.vue"),
        meta: {
          title: "个人信息",
        },
      },
      {
        path: "/user/tag",
        component: () => import("@/pages/user/user-tag/user-tag.vue"),
        meta: {
          title: "我的标签",
        },
      },
      {
        path: "/user/team/manager",
        component: () => import("@/pages/user/user-team/user-team-manager.vue"),
        meta: {
          title: "管理队伍",
        },
      },
      {
        path: "/information",
        component: () => import("@/pages/information/information-index.vue"),
        meta: {
          title: "信息",
        },
      },
      {
        path: "/setting",
        component: () => import("@/pages/setting/index.vue"),
        meta: {
          title: "设置",
        },
      },
      {
        path: "/notice",
        component: () => import("@/pages/notice/index.vue"),
        meta: {
          title: "系统公告",
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/pages/other/login.vue"),
  },
  {
    path: "/register",
    component: () => import("@/pages/other/register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // scrollBehavior: (to, from, savedPosition) => {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // },
  routes,
});

// 全局注册路由
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
