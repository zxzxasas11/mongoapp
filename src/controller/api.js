const ApiModel =require('../module/api');
class ApiController{
    /**
     * 添加api
     * @param ctx
     * @returns {Promise<void>}
     */
    static async add(ctx){
        let params = ctx.request.body;
        params.updater = ctx.user.userId;
        let data = await ApiModel.add(params);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功",
        };
    }

    /**
     * 删除
     * @param ctx
     * @returns {Promise<void>}
     */
    static async remove(ctx){
        await ApiModel.remove(ctx.params.id);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "删除成功",
        };
    }

    static async getList(ctx){
        let params = ctx.request.query;
        let data = await ApiModel.getList(params);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询结果",
            data:data
        };
    }


    /**
     * 查询单条
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getOne(ctx){
        let id = ctx.params.id;
        let data = await ApiModel.getOne(id);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询结果",
            data:data
        };
    }

    /**
     * 修改
     * @param ctx
     * @returns {Promise<void>}
     */
    static async edit(ctx){
        let id = ctx.params.id,params=ctx.request.body;
        params.updater = ctx.user.userId;
        params.update_time = new Date();
        let data = await ApiModel.edit(id,params);
        if(data){
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "修改成功",
            };
        }
        else{
            ctx.response.status = 400;
            ctx.body = {
                code: 400,
                msg: "修改失败",
            };
        }
    }
}
module.exports = ApiController;


