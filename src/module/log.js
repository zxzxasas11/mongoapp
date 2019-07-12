const Log = require('../schema/log');
const mongoose = require('mongoose');
class LogModel {
    static async create(msg, level, info){
        let log = {
            level: level || 'info',
            message: msg,
            info: {
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
            }
        };
        Log.create(log, (err, res) => {
            if(err) {console.log(err)}
        })
    }
}
module.exports = LogModel;
