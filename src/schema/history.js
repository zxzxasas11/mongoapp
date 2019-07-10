"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let historySchema = new Schema({
        articleId: { type: Schema.Types.ObjectId,ref:'Article'},    //帖子id
        creator:{type:Schema.Types.ObjectId,ref:'User'},      //创建人
        browse_time: {              //浏览时间
            type: Date,
            default:()=>{
                return Date.now();
            },
            get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
        },
    },
    { collection: 'history',versionKey: false });    //不需要版本号     自行命名表
let History = mongoose.model('History', historySchema);
module.exports =  History;
