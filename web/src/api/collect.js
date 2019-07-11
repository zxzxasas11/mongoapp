import fetch from './fetch';

export default {
    //查询所有
    addCollect(params) {
        return fetch.post('/collect/add', params);
    },
    removeCollect(params){
        return fetch.post("/collect/remove",params);
    },
    getAll(params){
        return fetch.get("/collect/getAll",params);
    }
}
