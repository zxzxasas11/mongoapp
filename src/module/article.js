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
     * @returns {Promise<*>}
     */
    static async getAll(){
        //let pageSize  = parseInt(params.pageSize)||10;
        //let currentPage = parseInt(params.currentPage)||1;

        try {
            return await Article.find({},'title content create_time').populate({path: 'creator', select: 'username'})
                //.limit(pageSize).skip(currentPage)
                //.populate({path: 'column_id',select:"name"})
                .sort({'create_time':-1});
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * 删除
     * @param id
     * @returns {Promise<void>}
     */
    static async deleteArticleById(id){
        //console.log(ctx.request.body._id);
        try {
            return await Article.findByIdAndRemove(id);
        }catch (e) {
            console.log(e);
        }

    }

}
module.exports = ArticleModel;
