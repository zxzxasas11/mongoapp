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
        params.articleId = ctx.request.body.articleId;
        let data = await CollectModel.addCollect(params);
        console.log(data);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功",
        };
    }

    /**
     * 取消收藏
     * @param ctx
     * @returns {Promise<void>}
     */
    static async removeCollect(ctx){
        let params={};
        params.articleId =  ctx.request.body.articleId;
        params.creator = ctx.user.userId;
        let data = await CollectModel.removeCollect(params);
        console.log(data);
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


