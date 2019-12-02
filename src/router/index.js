import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  },
  //侧边栏所有的路径都放这里
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/dashboard.vue"),
    children: [
      // 订单管理
      {
        path: "/order/orderInfo",
        name: "advpc",
        component: () => import("../components/order/orderOrderInfo")
      },
      // 首页管理路由
      {
        path: "/homepage/adv/pc",
        name: "advpc",
        component: () => import("../components/homepage/advPc")
      },
      {
        path: "/homepage/zone/pc",
        name: "advpc",
        component: () => import("../components/homepage/zonePc")
      },
      {
        path: "/homepage/website/navBar",
        name: "advpc",
        component: () => import("../components/homepage/websiteNavBar")
      },
      {
        path: "/homepage/website/websiteNav",
        name: "advpc",
        component: () => import("../components/homepage/websiteWebsiteNav")
      },
      {
        path: "/homepage/website/websiteLink",
        name: "advpc",
        component: () => import("../components/homepage/websiteWebsiteLink")
      },
      // 课程管理
      {
        path: "/course/course/course",
        name: "advpc",
        component: () => import("../components/course/courseCourseCourse")
      },
      {
        path: "/course/course/audit",
        name: "advpc",
        component: () => import("../components/course/courseCourseAudit")
      },
      {
        path: "/course/category/category",
        name: "advpc",
        component: () => import("../components/course/courseCategoryCategory")
      },
      // 讲师管理
      {
        path: "/lecturer/lecturer/lecturer",
        name: "advpc",
        component: () =>
          import("../components/lecturer/lecturerLecturerLecturer")
      },
      {
        path: "/lecturer/lecturer/audit",
        name: "advpc",
        component: () => import("../components/lecturer/lecturerLecturerAudit")
      },
      {
        path: "/lecturer/profit/profit",
        name: "advpc",
        component: () => import("../components/lecturer/lecturerProfitProfit")
      },
      // 学员管理
      {
        path: "/user/ext",
        name: "advpc",
        component: () => import("../components/user/userExt")
      },
      // 系统管理
      {
        path: "/sys/pms/user",
        name: "advpc",
        component: () => import("../components/sys/pmsUser")
      },
      {
        path: "/sys/pms/role",
        name: "advpc",
        component: () => import("../components/sys/pmsRole")
      },
      {
        path: "/sys/pms/menu",
        name: "advpc",
        component: () => import("../components/sys/pmsMenu")
      },
      {
        path: "/sys/website/website",
        name: "advpc",
        component: () => import("../components/sys/websiteWebsite")
      },
      {
        path: "/sys/website/sys",
        name: "advpc",
        component: () => import("../components/sys/websiteSys")
      },
      {
        path: "/sys/platform/platform",
        name: "advpc",
        component: () => import("../components/sys/platformPlatform")
      },
      {
        path: "/sys/log/sys",
        name: "advpc",
        component: () => import("../components/sys/logSys")
      },
      {
        path: "/sys/log/orderPay",
        name: "advpc",
        component: () => import("../components/sys/logOrderPay")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
