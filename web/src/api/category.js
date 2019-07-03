import fetch from './fetch';

export default {
    // 登录
    getAll(params) {
        return fetch.get('/category/getAll', params)
    },

}
