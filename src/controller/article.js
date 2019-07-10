const ArticleModel =require('../module/article');
const CreateFs = require('../util/upload');
class ArticleController{
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise<void>}
     */
    static async add(ctx){
        let params= ctx.request.body;
        /*if(ctx.request.files.file){
            try {
                params.url = await CreateFs(ctx.request.files.file);
            }catch (e) {
                console.log(e);
                ctx.response.status = 20000;
                ctx.body = {
                    code: 20000,
                    msg: "上传失败",
                };
            }
        }*/
        params.creator = ctx.user.userId;
        let aa= await ArticleModel.add(params);
        if(aa._id){
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "添加成功",
            };
        }
        else {
            ctx.response.status = 400;
            ctx.body = {
                code: 400,
                msg: "服务器错误",
            };
        }
    }


    /**
     * 查询 根据栏目
     * @param ctx
     * @returns {Promise<*>}
     */
    static async getAll(ctx){
        //console.log(ctx.request.query);
        let data = await ArticleModel.getAll(ctx.request.query.columnId);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询成功",
            data:data
        };
    }

    /**
     * 根据_id查询单条
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getOne(ctx) {
        let id = ctx.request.query.id;
        let currentPage = ctx.request.query.currentPage||1;
        await ArticleModel.addView(id);
        let data = await ArticleModel.getOne(id,currentPage);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询成功",
            data: data
        };
    }

    /**
     * 添加回复
     * @param ctx
     * @returns {Promise<void>}
     */
    static async addComment(ctx){
        let params = ctx.request.body;
        params.creator = ctx.user.userId;
        await ArticleModel.addComment(params);
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
    static async deleteArticle(ctx){
        let data = await ArticleModel.deleteArticleById(ctx.request.body._id);
        if(data._id){
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "删除成功",
            };
        }
        else{
            ctx.response.status = 400;
            ctx.body = {
                code: 400,
                msg: "服务器故障",
            };
        }

    }
}
module.exports = ArticleController;


