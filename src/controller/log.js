const LogModel =require('../module/log');
class LogController{
    /**
     * 查询日志
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getLog(ctx){
        let data = await LogModel.getLog(ctx.request.query);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询结果",
            data:data
        };
    }

    static async addLog(ctx){
        global.log.desc = "查询";
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询结果",
        };
    }


}
module.exports = LogController;


