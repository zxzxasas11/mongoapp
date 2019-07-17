import fetch from './fetch';

export default {
    //查询所有
    getAll(params) {
        return fetch.get('/category/getAll', params);
    },
    //添加大类
    addCategory(params){
        return fetch.post("/category/add",params);
    },
    //添加栏目
    addColumn(params){
        return fetch.post("/category/addColumn",params);
    },
    delete(params){
        return fetch.post("/category/delete",params);
    },
}
