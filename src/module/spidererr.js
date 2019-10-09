const Spidererr = require('../schema/spidererr');
const mongoose = require('mongoose');
const moment = require('moment');
class SpidererrModel {
    /**
     * 添加
     * @param params
     * @returns {Promise<*>}
     */
    static async add(params){
        let data =await Spidererr.findOne({url:params.url});
        let spidererr = new Spidererr(params);
        if(data!==null){
            console.log("这个已经入库");
            return "have"
        }
        else {
            console.log("这条数据正常入err库,错误原因为"+params.remark);
            return await spidererr.save();
        }

    }

    static async getOne(){
        return await Spidererr.findOne({remark:"未读取到图片路径",status:{$nin:[1,4]}}).limit(1)
    }

    static async edit(id,code){
        return await Spidererr.updateOne({_id:id},{status:parseInt(code)});
    }

}
module.exports = SpidererrModel;
