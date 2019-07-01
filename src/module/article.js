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

    static async getAll(){
        try {
            return await Article.find();
        }
        catch (e) {
            console.log(e);
        }
    }

}
module.exports = UserModel;
