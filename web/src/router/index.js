import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode:"history",
  scrollBehavior(to, from, savedPosition) {
    // 兼容
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: '主页',
      component(resolve) {
        require(['../view/Home.vue'], resolve);
      },
    },
    {
      path: '/Login',
      name: '登录',
      component(resolve) {
        require(['../view/Login'], resolve);
      },
    },
    {
      path: '/Manage',
      name: '后台',
      component(resolve) {
        require(['../view/manage/Main'], resolve);
      },
      children:[
        {
          path: '/userManage',
          name: '用户管理',
          component(resolve) {
            require(['../view/Manage/secondMenu/userManage'], resolve);
          },
        },
        {
          path: '/categoryManage',
          name: '分类管理',
          component(resolve) {
            require(['../view/Manage/secondMenu/categoryManage'], resolve);
          },
        },
        {
          path: '/articleManage',
          name: '帖子管理',
          component(resolve) {
            require(['../view/Manage/secondMenu/articleManage'], resolve);
          },
        },
      ]
    }
  ]
})
