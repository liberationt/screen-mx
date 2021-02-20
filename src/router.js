import Vue from "vue";
import VueRouter from "vue-router";
import { getCode } from "@/api/order";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: "",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/index/index.vue")
    },
    {
      path: "/elderlyInfor",
      name: "elderlyInfor",
      component: () => import("./views/index/components/elderlyInfor/index.vue")
    },
    {
      path: "/wisdomOlder",
      name: "wisdomOlder",
      component: () => import("./views/index/components/wisdomOlder/index.vue")
    },
    {
      path: "/communityInfor",
      name: "communityInfor",
      component: () => import("./views/index/components/communityInfor/index.vue")
    },
    {
      path: "/facilitiesInfor",
      name: "facilitiesInfor",
      component: () => import("./views/index/components/facilitiesInfor/index.vue")
    },
    {
      path: "/pensionAdvisor",
      name: "pensionAdvisor",
      component: () => import("./views/index/components/pensionAdvisor/index.vue")
    },
    {
      path: "/homeOlder",
      name: "homeOlder",
      component: () => import("./views/index/components/homeOlder/index.vue")
    },
    {
      path: "/video",
      name: "video",
      component: () => import("./views/index/components/video/index.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  // getCode({
  //   grant_type: "refresh_token",
  //   client_id: "fO4iq61pPVuhbPSKmAgNF3mt",
  //   client_secret: "RBDjX9yl4MouiDazfMJza9LZ",
  //   refresh_token: localStorage.getItem("refreshToken")
  // }).then(res => {
  //   if (res) {
  //     localStorage.removeItem("accessToken");
  //     localStorage.setItem("accessToken", res.access_token);
  //
  //   }
  // });
  next();
});

export default router;
