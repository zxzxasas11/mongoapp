const Article = require('../schema/article');
class UserModel {
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
    static async getAll(params){
        let pageSize  = params.pageSize !==undefined?parseInt(params.pageSize):10;
        let currentPage = params.currentPage !==undefined?parseInt(params.currentPage):1;
        try {
            return await Article.find().limit(pageSize).skip(currentPage).sort({'create_time':-1});
        }
        catch (e) {
            console.log(e);
        }
    }

}
module.exports = UserModel;
