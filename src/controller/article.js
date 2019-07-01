const ArticleModel =require('../module/article');
class ArticleController{
    static async add(ctx){
        console.log(ctx.request.body);
        let {title,content,creator}= ctx.request.body;
        let params = {title,content,creator};
        let aa= await ArticleModel.add(params);
        if(aa._id){
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "添加成功",
            };
        }
    }

    /**
     * 查询
     * @param ctx
     * @returns {Promise<*>}
     */
    static async getAll(ctx){
        let data = await ArticleModel.getAll();
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询成功",
            data:data
        };
    }
}
module.exports = ArticleController;


