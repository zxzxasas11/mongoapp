const Spider = require('../schema/spider');
const mongoose = require('mongoose');
const moment = require('moment');
class SpiderModel {
    /**
     * 添加
     * @param params
     * @returns {Promise<*>}
     */
    static async add(params){

        params.title = params.title.replace(/[\'\"\\\\\/\/|/|/*//?//"///'/:/b\f\n\r\t]/g, '');
        if(params.url.indexOf("//")===0){
            params.remark = "url错误";
        }
        let data =await Spider.findOne({url:params.url});
        let spider = new Spider(params);
        if(data!==null){
            console.log("这个已经入库");
            return "have"
        }
        else {
            console.log("这条数据正常入库,url为"+params.url);
            return await spider.save();
        }

    }

    /**
     *
     * @returns {Promise<*>}
     */
    static async getDownloadList(){
        return await Spider.find({status:{$ne:1}}).limit(50);
    }

    static async setStatus(id,code){
        await Spider.updateOne({_id:id,status:0},{status:parseInt(code),download_time:new Date()});
    }

    /**
     * 查询日志
     * @param params
     * @returns {Promise<*>}
     */
    static async getSpiderLog(params){
        return Spider.aggregate([
            {$match:params},
            {$group:{_id:{create_time:{ $dateToString: { format: "%Y-%m-%d", date: "$create_time"}},title:"$title"},count:{$sum:1}}},
            {$project:{_id:0,date:"$_id.create_time",title:"$_id.title",count:"$count"}}
        ]).sort({_id:-1});
    }
}
module.exports = SpiderModel;
