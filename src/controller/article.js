const ArticleModel =require('../module/article');
const CreateFs = require('../util/upload');
class ArticleController{
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise<void>}
     */
    static async add(ctx){
        let {title,content,creator}= ctx.request.body;
        let params = {title,content,creator};
        if(ctx.request.files.file){
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
        }
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
     * 查询
     * @param ctx
     * @returns {Promise<*>}
     */
    static async getAll(ctx){
        let data = await ArticleModel.getAll(ctx.request.query);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询成功",
            data:data
        };
    }
}
module.exports = ArticleController;


