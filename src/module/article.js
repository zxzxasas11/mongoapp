const Article = require('../schema/article');
class ArticleModel {
    /**
     * 增加
     * @param params
     * @returns {Promise<*>}
     */
    static async add(params){
        try {
            const article = new Article(params);
            return await article.save();
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 查询所有
     * @param columnId
     * @returns {Promise<void>}
     */
    static async getAll(columnId){
        //let pageSize  = parseInt(params.pageSize)||10;
        //let currentPage = parseInt(params.currentPage)||1;
        try {
            return await Article.find({"column_id":columnId},'title content create_time').populate({path: 'creator', select: 'username'})
                //.limit(pageSize).skip(currentPage)
                //.populate({path: 'column_id',select:"name"})
                .sort({'create_time':-1});
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * 添加浏览量
     * @param articleId
     * @returns {Promise<*>}
     */
    static async addView(articleId){
        try {
            return await Article.update({ _id: articleId },
                {$inc: {view: 1}});
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 根据_id查询单条数据
     * @param id
     * @param currentPage
     * @returns {Promise<void>}
     */
    static async getOne(id,currentPage){
        let pageSize=10;
        try {
            return await Article.findOne({"_id":id},{"comments":{$slice:[(currentPage-1)*pageSize,pageSize]}}).populate({path: 'creator', select: 'username create_time'})
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 添加回复内容
     * @param params
     * @returns {Promise<*>}
     */
    static async addComment(params){
        try {
            return await Article.update({_id:params.id},{$push:{'comments':{
                        content:params.content,
                        creator:params.creator
                    }}})
        }catch (e) {
            console.log(e);
        }
    }
    /**
     * 删除
     * @param id
     * @returns {Promise<void>}
     */
    static async deleteArticleById(id){
        //console.log(ctx.request.body._id);i
        try {
            return await Article.findByIdAndRemove(id);
        }catch (e) {
            console.log(e);
        }

    }

}
module.exports = ArticleModel;
