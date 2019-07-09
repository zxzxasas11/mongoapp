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
      component: () => import('./view/exhibition/article.vue')
    },
    {
      path: '/personal/:id',
      name: '个人中心',
      component: () => import('./view/exhibition/personal.vue')
    },
    {
      path: '/Login',
      name: '登录',
      component:() => import('./view/Login.vue')
    },
    {
      path: '/Manage',
      name: '后台',
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
          path: '/articleManage',
          name: '帖子管理',
          component:() => import('./view/manage/secondMenu/articleManage.vue')
        },
      ]
    }
  ]
})
