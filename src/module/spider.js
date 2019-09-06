const Spider = require('../schema/spider');
const mongoose = require('mongoose');
const moment = require('moment');
class SpiderModel {
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
}
module.exports = SpiderModel;
