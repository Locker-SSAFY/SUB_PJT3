import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store/index.js"

import mypage from "../views/mypage.vue";
import userpage from "../views/UserPage.vue";
import article from "../views/mypage-tabs/article.vue";
import repository from "../views/mypage-tabs/repository.vue";
import introduce from "../views/mypage-tabs/introduce.vue";

Vue.use(VueRouter);

// const rejectAuthUser = (to, from, next) => {
//   // if(store.state.isLogin === true){

//   if (localStorage.getItem("X-AUTH-TOKEN") !== null) {
//     //이미 로그인된 유저니까 막아야함.
//     alert("이미 로그인 되었습니다!");
//     next();
//   } else {
//     next();
//   }
// };
// const onlyAuthUser = (to, from, next) => {
//   // if(store.state.isLogin === false){
//   alert("on1");
//   if (localStorage.getItem("X-AUTH-TOKEN") === null) {
//     //이미 로그인 안된 유저니까 막아야함.
//     //alert('로그인이 필요한 기능입니다!');
//     next("/");
//   } else {
//     next();
//   }
// };
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    //beforeEnter: rejectAuthUser,
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    //beforeEnter: onlyAuthUser,
    component: mypage,
    children: [
      { path: "/", component: article },
      { path: "/article", component: article },
      {
        path: "/repository",
        component: repository,
        // children: [
        //   { path: "/", component: myRepository },
        //   { path: "/myRepository", component: myRepository },
        //   { path: "/addMyRepository", component: addMyRepository },
        // ],
      },
      { path: "/introduce", component: introduce },
    ],
  },
  {
    path: "/userpage/:usrId",
    name: "userpage",
    component: userpage,
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Join.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue"),
  },
  {
    path: "/createPost",
    name: "createPost",
    component: () =>
      import(
        /* webpackChunkName: "createPost" */ "../views/post/createPost.vue"
      ),
  },
  {
    path: "/readPost/:pid",
    name: "readPost",
    component: () =>
      import(/* webpackChunkName: "readPost" */ "../views/post/readPost.vue"),
  },
  {
    path: "/editPost",
    name: "editPost",
    component: () =>
      import(/* webpackChunkName: "editPost" */ "../views/post/editPost.vue"),
  },
  {
    path: "/afterPost",
    name: "afterPost",
    component: () =>
      import(/* webpackChunkName: "afterPost" */ "../views/post/afterPost.vue"),
  },

  {
    path: "/userSetting",
    name: "userSetting",
    component: () =>
      import(/* webpackChunkName: "userSetting" */ "../views/UserSetting.vue"),
  },
  {
    path: "/verify/success",
    name: "verifySuccess",
    component: () =>
      import(
        /* webpackChunkName: "verifySuccess" */ "../views/verifySuccess.vue"
      ),
  },
  {
    path: "/login/github",
    name: "githublogin",
    component: () =>
      import(/* webpackChunkName: "Github" */ "../views/Github.vue"),
  },
  {
    path: "/findPassword",
    name: "findPassword",
    component: () =>
      import(
        /* webpackChunkName: "findPassword" */ "../views/user/FindPassword.vue"
      ),
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: () =>
      import(
        /* webpackChunkName: "changePassword" */ "../views/user/ChangePassword.vue"
      ),
  },
  {
    path: "/memberInfo",
    name: "memberInfo",
    component: () =>
      import(
        /* webpackChunkName: "changePassword" */ "../views/memberInfo.vue"
      ),
  },
  {
    path: "/notice/1",
    name: "notice1",
    component: () =>
      import(
        /* webpackChunkName: "changePassword" */ "../views/notice/notice-1.vue"
      ),
  },
  {
    path: "/notice/2",
    name: "notice2",
    component: () =>
      import(
        /* webpackChunkName: "changePassword" */ "../views/notice/notice-2.vue"
      ),
  },
  {
    path: "/notice/3",
    name: "notice3",
    component: () =>
      import(
        /* webpackChunkName: "changePassword" */ "../views/notice/notice-3.vue"
      ),
  },
  {
    path: "/repoDetail",
    name: "repoDetail",
    component: () =>
      import(
        /* webpackChunkName: "repoDetail" */ "../views/mypage-tabs/RepoDetail.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
