import fetch from '../fetch';

export default {
    //查询所有
    getAll(params) {
        return fetch.post('/equipment/getAll', params);
    },
}
