const Article = require('../schema/article');
const Category = require('../schema/category');
const mongoose = require('mongoose');
const moment = require('moment');
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
        let currentPage = parseInt(params.currentPage)||1;
        try {
            if(params.columnId){
                let data ={};
                data.data =await Article.aggregate([
                    {$match:{"column_id":mongoose.Types.ObjectId(params.columnId)}},
                    { "$lookup": {
                            from: "user",            //要写表名!要写表名!要写表名!
                            localField: "creator",
                            foreignField: "_id",
                            as: "a"
                        }},
                    { "$lookup": {
                            from: "category",            //要写表名!要写表名!要写表名!
                            localField: "column_id",
                            foreignField: "column._id",
                            as: "k"
                        }},
                    {$unwind:'$a'},
                    {$unwind:'$k'},
                    {$project:{
                            "_id":0,
                            "title":"$title",
                            "username":"$a.username",
                            "columnName":"$k.name",
                            "view":"$view",
                            "create_time":"$create_time",
                            "userId":"$a._id",
                            "articleId":"$_id",
                            "comments":{$ifNull:[{$size:"$comments"},0]},
                        }
                    },
                    {$skip:(currentPage-1)*10},
                    {$limit:10}
                ]);
                data.count = await Article.countDocuments({"column_id":params.columnId});
                return data;
            }
            else{
                let data ={};
                data.data =await Article.aggregate([
                    { "$lookup": {
                            from: "user",            //要写表名!要写表名!要写表名!
                            localField: "creator",
                            foreignField: "_id",
                            as: "a"
                        }},
                    { "$lookup": {
                            from: "category",            //要写表名!要写表名!要写表名!
                            localField: "column_id",
                            foreignField: "column._id",
                            as: "k"
                        }},
                    {$unwind:'$a'},
                    {$unwind:'$k'},
                    {$project:{
                            "_id":0,
                            "title":"$title",
                            "username":"$a.username",
                            "columnName":"$k.name",
                            "view":"$view",
                            "create_time":"$create_time",
                            "userId":"$a._id",
                            "articleId":"$_id",
                            "comments":{$ifNull:[{$size:"$comments"},0]},
                        }
                    },
                    {$skip:(currentPage-1)*10},
                    {$limit:10}
                ]);
                data.count = await Article.countDocuments();
                return data;
            }
            //未传columnId则查所有

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

    /**
     * 获取面包屑
     * @param params
     * @returns {Promise<void>}
     */
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

    /**
     * 修改
     * @param params
     * @returns {Promise<void>}
     */
    static async edit(params){
        let size  = await Article.findOne({"_id":params.id});
        if(size){
            return await Article.updateOne({"_id":params.id},{"content":params.content});
        }
        else{
            return await Article.updateOne({"comments._id":params.id},{
                $set: {
                    "comments.$.content":params.content
                }
            });
        }
    }
}
module.exports = ArticleModel;
