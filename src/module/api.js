const Api = require('../schema/api');
const mongoose = require('mongoose');
const moment = require('moment');
const pageQuery = require('../util/pageQuery');
class ApiModel {
    /**
     * 创建api
     * @param params
     * @returns {Promise<void>}
     */
    static async add(params){
        try {
            return await Api.create(params);
        }catch (e) {
            console.log(e);
        }

    }

    /**
     * 删除
     * @param id
     * @returns {Promise<*>}
     */
    static async remove(id){
        try {
            return await Api.remove({_id:id})
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 获取列表
     * @param params
     * @returns {Promise<void>}
     */
    static async getList(params){
        //let arr = ["name"];
        return await pageQuery(Api,{category:{$in:params.category}},"",{"update_time":-1});
    }

    /**
     * 根据id查询单条
     * @param id
     * @returns {Promise<void>}
     */
    static async getOne(id){
        try {
            return await Api.findById(id);
        }catch (e) {
            console.log(e)
        }

    }

    /**
     * 修改
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    static async edit(id,params){
        try {
            return await Api.updateOne({_id:id},params);
        }catch (e) {
            console.log(e);
        }
    }

}
module.exports = ApiModel;
