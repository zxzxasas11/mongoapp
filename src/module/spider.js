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
        let spider = new Spider(params);
        let data =await Spider.findOne({url:params.url});
        if(data!==null){
            console.log("这个已经入库");
            return "have"
        }
        else {
            console.log("这条数据正常入库,url为"+params.url);
            return await spider.save();
        }

    }

    static async getDownloadList(){
        return await Spider.find({status:0}).limit(50);
    }

    static async setStatus(id){
        await Spider.updateOne({_id:id,status:0},{status:1});
    }
}
module.exports = SpiderModel;
