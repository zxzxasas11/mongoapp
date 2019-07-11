const Collect = require('../schema/collect');
const mongoose = require('mongoose');
class CollectModel {
    /**
     * 取消收藏
     * @param params
     * @returns {Promise<*>}
     */
    static async addCollect(params){
        try {
            let collect = new Collect(params);
            return await collect.save();
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 取消收藏
     * @param params
     * @returns {Promise<void>}
     */
    static async removeCollect(params){
        try {
            return await Collect.findOneAndRemove({"articleId":params.articleId,"creator":params.creator});
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 查询个人收藏列表
     * @param userId
     * @returns {Promise<*>}
     */
    static async getAll(userId){
        try {
            return await Collect.find({"creator":userId}).sort({"create_time":-1});
        }catch (e) {
            console.log(e);
        }
    }

    static async getOne(articleId,userId){
        return await Collect.findOne({"articleId":articleId,"creator":userId});
    }
}
module.exports = CollectModel;
