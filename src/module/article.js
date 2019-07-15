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
     * 查询列表
     * @param columnId
     * @param currentPage
     * @returns {Promise<void>}
     */
    static async getAll(columnId,currentPage){
        //let pageSize  = parseInt(params.pageSize)||10;
        currentPage = parseInt(currentPage)||1;
        try {
            //未传columnId则查所有
            if(columnId===undefined){
                /*return await Article.aggregate([{ "$lookup": {
                        from: "User",
                        localField: "creator",
                        foreignField: "_id",
                        as: "username"
                    }},{$unwind: '$comments'},{$sort: {create_time: -1}},{ $group: { "_id":{"_id" : "$_id","title":"$title","content":"$content","create_time":"$create_time","creator":"$creator","username":"$username"},"comments":{$sum:1}}},{$project: {data:"$_id",_id:0,count:"$comments"}}
                    ]);*/
                //return await Article.find().limit(10).skip(currentPage)
                return await Article.aggregate([
                    {$unwind:"$comments"},
                    { "$lookup": {
                            from: "User",
                            localField: "creator",
                            foreignField: "_id",
                            as: "username"
                        }},
                    {$group: { "_id":{"_id" : "$_id","title":"$title","column_id":"$column_id","create_time":"$create_time","creator":"$creator","username":"$username"},"total":{$sum:1}}},
                    //{$project: {total: {$cond : [{$eq: ["$comments", []] }, 0, '$comments']}}}
                    {$project:{"data":"$_id","total":"$total","_id":0}},
                    //{$sort:{"total":-1}}
                ]);

            }
            else{
                let data={};
                /*return await Article.aggregate([/!*{ "$lookup": {
                        from: "User",
                        localField: "creator",
                        foreignField: "_id",
                        as: "username"
                    }},*!/{$unwind: '$comments'},{$sort: {create_time: -1}},{ $match: { "column_id":mongoose.Types.ObjectId(columnId)}},{ $group: { "_id":{"_id" : "$_id","title":"$title","content":"$content","create_time":"$create_time","creator":"$creator","username":"$username"},"comments":{$sum:1}}},{$project: {data:"$_id",_id:0,count:"$comments"}}
                    ]);*/
                data.data =  await Article.find({"column_id":columnId},'title content create_time').populate({path: 'creator', select: 'username'})
                .limit(10).skip(currentPage)
                .populate({path: 'column_id',select:"name"}).sort({'create_time':-1});
                data.count = await Article.countDocuments({"column_id":columnId});
                return data;
            }
            //{ $group: {"_id": { "_id" : "$_id","title":"$title","content":"$content","create_time":"$create_time","creator":"$creator","username":"$username"} , "comments":{$sum:1}}}
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
            data.data =  await Article.findOne({"_id":id},{"comments":{$slice:[(currentPage-1)*pageSize,pageSize]}}).populate([{path: 'creator', select: 'username create_time'},{path: 'comments.creator', select: 'username'}]).sort({"comments.create_time":1});
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
