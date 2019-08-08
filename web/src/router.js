import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:"/home",
      component: () => import('./view/exhibition/home.vue'),
      children:[
        {
          path: '/home',
          name: '首页',
          component: () => import('./view/exhibition/index.vue')
        },
        {
          path: '/column/:id',
          name: '帖子列表',
          component: () => import('./view/exhibition/column.vue')
        },
        {
          path: '/article/:id',
          name: '帖子内容',
          component: () => import('./view/exhibition/articleDetail.vue')
        },
        {
          path: '/personal/:id',
          name: '个人中心',
          component: () => import('./view/exhibition/personal.vue')
        },
      ]
    },
    {
      path: '/FGO',
      name: 'fgo应用',
      component:() => import('./view/application/fgo/index.vue'),
      redirect:"/FGO/list",
      children:[
        {
          path: '/FGO/list',
          name: '英灵列表',
          component:() => import('./view/application/fgo/list.vue')
        },
        {
          path: '/FGO/material',
          name: '材料列表',
          component:() => import('./view/application/fgo/material.vue')
        },
      ]
    },

    {
      path: '/Login',
      name: '登录',
      component:() => import('./view/Login.vue')
    },
    {
      path: '/Manage',
      name: '后台管理系统',
      component:() => import('./view/manage/Main.vue'),
      children:[
        {
          path: '/userManage',
          name: '用户管理',
          component:() => import('./view/manage/secondMenu/userManage.vue'),
        },
        {
          path: '/categoryManage',
          name: '分类管理',
          component:() => import('./view/manage/secondMenu/categoryManage.vue'),
        },
        {
          path: '/dataControl',
          name: '数据监控',
          component:() => import('./view/manage/secondMenu/dataControl.vue'),
        },
        {
          path: '/articleManage',
          name: '帖子管理',
          component:() => import('./view/manage/secondMenu/articleManage.vue')
        },
      ]
    }
  ]
})
