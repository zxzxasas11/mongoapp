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
    },
    getOne(params){
        return fetch.get("/article/getOne",params);
    },
    addComment(params){
        return fetch.post("/article/addComment",params);
    },
    getByUser(params){
        return fetch.get("/article/getByUser",params);
    },
    getBread(params){
        return fetch.get("/article/getBread",params);
    },
    edit(params){
        return fetch.put("/article/edit",params);
    },
    editStatus(params){
        return fetch.put("/article/editStatus",params);
    }
}
