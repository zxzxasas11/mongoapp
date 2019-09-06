const Spider = require('../schema/spider');
const mongoose = require('mongoose');
const moment = require('moment');
class SpiderModel {
    static async add(params){
        let spider = new Spider(params);
        let data =await Spider.findOne({url:params.url});
        console.log(data);
        if(data!==null){
            console.log("这个已经入库")
        }
        else {
            console.log("这条数据正常入库,url为"+params.url);
            return await spider.save();
        }

    }
}
module.exports = SpiderModel;
