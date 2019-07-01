import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import tags from './modules/tags'
import getters from './getter'
Vue.use(Vuex);

const store = new Vuex.Store({
  /*mutations: {},
  actions: {

  },*/
  modules:{
    user,
    tags
  },
  getters
});

/**
 * 查询模块
 */
const modulesContext = require.context('@/store/modules', true, /\.js$/);

/**
 * 创建模块
 */
//createStoreModules(modulesContext);

/**
 * 创建模块函数
 * @param fileArr
 */
function createStoreModules(fileArr) {
  fileArr.keys().forEach(modules => {
    store.registerModule(modules.replace(/(^\.\/)|(\.js$)/g, ''), fileArr(modules).default)
  });
}

export default store;
