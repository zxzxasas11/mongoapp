const LogModel =require('../module/log');
class LogController{
    static async getLog(ctx){
        let data = await LogModel.getLog(ctx.request.query);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询结果",
            data:data
        };
    }
}
module.exports = LogController;


