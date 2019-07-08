import fetch from './fetch';

export default {
    //查询所有
    getAll(params) {
        return fetch.get('/article/getAll', params);
    },
    delete(params){
        return fetch.post("/article/delete",params);
    },
    addArticle(params){
        return fetch.post("/article/add",params);
    }

}
