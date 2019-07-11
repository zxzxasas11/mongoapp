const HistoryModel =require('../module/history');
class HistoryController{
    /**
     * 查询历史记录
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getAll(ctx){
        const userId = ctx.user.userId;
        let data = await HistoryModel.getHistory(userId);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询结果",
            data:data
        };
    }
}
module.exports = HistoryController;


