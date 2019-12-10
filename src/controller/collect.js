const CollectModel =require('../module/collect');
class CollectController{
    /**
     * 添加收藏
     * @param ctx
     * @returns {Promise<void>}
     */
    static async addCollect(ctx){
        let params ={};
        params.creator = ctx.user.userId;
        params.heroId = ctx.params.heroId;
        try {
            await CollectModel.addCollect(params);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "添加成功",
            };
        }catch (e) {
            console.log(e);
            ctx.response.status = 200;
            ctx.body = {
                code: 500,
                msg: "server error",
            };
        }
    }

    /**
     * 取消收藏
     * @param ctx
     * @returns {Promise<void>}
     */
    static async removeCollect(ctx){
        let params={};
        params.heroId =  ctx.params.heroId;
        params.creator = ctx.user.userId;
        let data = await CollectModel.removeCollect(params);
        if(data._id){
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "取消收藏",
            };
        }

    }

    /**
     * 查询个人收藏
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getAll(ctx){
        let id = ctx.request.query.userId||ctx.user.userId;
        console.log(id);
        let data = await CollectModel.getAll(id);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询结果",
            data:data
        };
    }
}
module.exports = CollectController;


