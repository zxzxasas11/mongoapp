import fetch from './fetch';

export default {
    // 登录
    login(params) {
        return fetch.post('/user/login', params);
    },
    register(params){
        return fetch.post("/user/add",params);
    },
    getAll(params){
        return fetch.post("/user/getAll",params);
    },
    getByUser(params){
        return fetch.get("/user/getByUser",params);
    },
    getAuthCode(params){
        return fetch.post("/user/getCode",params);
    }

}
