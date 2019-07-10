const History = require('../schema/history');
const mongoose = require('mongoose');
class HistoryModel {
    /**
     * 增加历史记录
     * @param params
     * @returns {Promise<void>}
     */
    static async addHistory(params){
        try {
            const info = await History.findOne({"articleId":params.articleId,"creator":params.creator});
            if(info){
                await History.update({"articleId":params.articleId,"creator":params.creator},{"browse_time":new Date()})
            }
            else{
                const history  = new History(params);
                return await history.save();
            }
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 查询历史记录
     * @param userId
     * @returns {Promise<void>}
     */
    static async getHistory(userId){
        try {
            return await History.find({"creator":userId},"creator articleId browse_time").sort({"browse_time":-1});
        }catch (e) {
            console.log(e);
        }
    }
}
module.exports = HistoryModel;
