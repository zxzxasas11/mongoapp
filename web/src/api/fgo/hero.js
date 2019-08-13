import fetch from '../fetch';

export default {
    //查询所有ce
    getAll(params) {
        return fetch.get('/hero/getAll', params);
    },
}
