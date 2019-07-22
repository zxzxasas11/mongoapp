import fetch from './fetch';

export default {
    //查询所有
    upload(params) {
        return fetch.upload('/upload', params);
    },
}
