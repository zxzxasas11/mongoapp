const Article = require('../schema/article');
const Category = require('../schema/category');
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
     * @param params
     * @returns {Promise<void>}
     */
    static async getAll(params){
        //let pageSize  = parseInt(params.pageSize)||10;
        let currentPage = parseInt(params.currentPage)||1;
        try {
            //未传columnId则查所有
            if(params.columnId===undefined){
                return await Article.find({},"title category view column_id create_time comments")
                    .populate({path:"creator",select:"username -_id"})
                    .limit(10).skip(currentPage).exec().then(ar=>{
                        console.log(ar);
                    })
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
                data.data =  await Article.find({"column_id":params.columnId},'title content create_time').populate({path: 'creator', select: 'username'})
                //.limit(10).skip(currentPage)
                //.populate({path: 'column_id',select:"name"}).sort({'create_time':-1});
                data.count = await Article.countDocuments({"column_id":params.columnId});
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
            data.count = a.length===0?0:a[0].count;
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
        try {
            return await Article.findByIdAndRemove(id);
        }catch (e) {
            console.log(e);
        }
    }

    static async getBread(params){
        try {
            let a ={};
            await Article.findOne({"_id":params.articleId},"title column_id -_id")
            .exec().then(async function(ar){
                let data =await Category.findOne({"column._id":ar.column_id},{'column.$': 1});
                a=JSON.parse(JSON.stringify(ar));
                a["columnName"] = data.column[0].name;
            });
            return a;
        }catch (e) {
            console.log(e);
        }
    }

}
module.exports = ArticleModel;
