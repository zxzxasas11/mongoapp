const Log = require('../schema/log');
const moment = require("moment");
class LogModel {
    /**
     * 创建日志
     * @param msg
     * @param level
     * @param info
     * @returns {Promise<void>}
     */
    static async create(msg, level, info){
        let log = {
            level: level || 'info',
            //message: msg,
            message: info.response.message||"",
            method: info.method,
            url: info.url,
            costTime: info.costTime,
            requestTime:Date.now(),
            status: info.response.status,
            /*info: {
                method: info.method,
                url: info.url,
                costTime: info.costTime,
                requestTime:Date.now(),
                body: JSON.stringify(info.body),
                response: {
                    status: info.response.status,
                    message: info.response.message,
                    header: JSON.stringify(info.response.header),
                    body: JSON.stringify(info.response.body)
                }
            }*/
        };
        Log.create(log, (err, res) => {
            if(err) {console.log(err)}
        })
    }

    /**
     * 根据时间查询   按照执行方法分类
     * @param params
     * @returns {Promise<*>}
     */
    static async getLog(params){
        let startTime = params.startTime||"1970-01-01";
        let endTime = params.endTime || moment(new Date()).format('YYYY-MM-DD');
        let target = params.target||"method";
        try {
            switch (target) {
                case "method":
                    return await Log
                        .aggregate([
                            {$match: {"info.requestTime":{$lte:new Date(endTime),$gte:new Date(startTime)}}},
                            {$unwind:"$info"},
                            {$group: { "_id":{"method":"$info.method"},"total":{$sum:1}}},
                            {$project:{"method":"$_id.method","total":"$total","_id":0}},
                            {$sort:{"total":-1}}
                        ]);
                case "url":
                    return await Log
                        .aggregate([
                            {$match: {"info.requestTime":{$lte:new Date(endTime),$gte:new Date(startTime)}}},
                            {$unwind:"$info"},
                            {$group: { "_id":{"url":"$info.url","method":"$info.method"},"total":{$sum:1}}},
                            {$project:{"url":"$_id.url","total":"$total","method":"$_id.method","_id":0}},
                            {$sort:{"total":-1}}
                        ]);
                case "status":
                    return await Log
                        .aggregate([
                            {$match: {"info.requestTime":{$lte:new Date(endTime),$gte:new Date(startTime)}}},
                            {$unwind:"$info"},
                            {$group: { "_id":{"status":"$info.response.status"},"total":{$sum:1}}},
                            {$project:{"status":"$_id.status","total":"$total","_id":0}},
                            {$sort:{"total":-1}}
                        ]);
                default:
                    return "参数错误";
            }

        }catch (e) {
            console.log(e);
        }
    }
}
module.exports = LogModel;
