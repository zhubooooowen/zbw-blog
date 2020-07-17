import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import('@/components/CommonLayout.vue'),
    children: [
      {
        path:'',
        component:() => import('@/views/Home.vue'),
        name:'home'
      },
      {
        path:'/detail/:id',
        component:() => import('@/views/Detail.vue')
      },
      {
        path:'/personal',
        component:() => import('@/views/Personal.vue'),
        meta:{
          requireAuth:true //true为这个页面需要登录权限
        }
      },
      {
        path:'/article',
        component:() => import('@/views/Article.vue'),
        meta:{
          requireAuth:true //true为这个页面需要登录权限
        },
        name:'article'
      },
      {
        path:'/article/add',
        name:'addArticle',
        component:() => import('@/views/ArticleEdit.vue'),
        meta:{
          requireAuth:true //true为这个页面需要登录权限
        }
      },
      {
        path:'/article/edit/:id',
        name:'updateArticle',
        component:() => import('@/views/ArticleEdit.vue'),
        meta:{
          requireAuth:true //true为这个页面需要登录权限
        }
      }
    ]
  },
  {
    path:'/login',
    component:() => import('@/views/Login.vue')
  }
];

const router = new VueRouter({
  routes,
  // 切换路由回到页面顶部
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
});

export default router;
