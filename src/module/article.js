const Article = require('../schema/article');
const mongoose = require('mongoose');
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
     * 栏目下查询所有
     * @param columnId
     * @returns {Promise<void>}
     */
    static async getAll(columnId){
        //let pageSize  = parseInt(params.pageSize)||10;
        //let currentPage = parseInt(params.currentPage)||1;
        try {
            //{ $group: {"_id": { "_id" : "$_id","title":"$title","content":"$content","create_time":"$create_time","creator":"$creator","username":"$username"} , "comments":{$sum:1}}}
            return await Article.aggregate([{ "$lookup": {
                    from: "User",
                    localField: "creator",
                    foreignField: "creator",
                    as: "username"
                }},{$unwind: '$comments'},{$sort: {create_time: -1}},{ $match: { "column_id":mongoose.Types.ObjectId(columnId) }},{ $group: { "_id":{"_id" : "$_id","title":"$title","content":"$content","create_time":"$create_time","creator":"$creator","username":"$username"},"comments":{$sum:1}}}]);
            /*return await Article.find({"column_id":columnId},'title content create_time').populate({path: 'creator', select: 'username'})
                //.limit(pageSize).skip(currentPage)
                //.populate({path: 'column_id',select:"name"})
                .sort({'create_time':-1});*/
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * 根据userId查询帖子
     * @param userId
     * @param currentPage
     * @returns {Promise<void>}
     */
    static async getByUser(userId,currentPage){
        try {
            return await Article.find({"creator":userId},"column_id create_time title ").limit(5).skip(parseInt(currentPage)).sort({"create_time":-1})
        }catch (e) {
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
            return await Article.updateOne({ _id: articleId },
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
            let data={};
            data.data =  await Article.findOne({"_id":id},{"comments":{$slice:[(currentPage-1)*pageSize,pageSize]}}).populate({path: 'creator', select: 'username create_time'}).sort({"comments.create_time":1});
            let a = await Article.aggregate().unwind('comments').match({"_id":mongoose.Types.ObjectId(id)}).group({"_id":id,count:{$sum:1}});
            data.count = a[0].count;
            return data;
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
            return await Article.updateOne({_id:params.id},{$push:{'comments':{
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
