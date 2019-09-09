"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let spiderSchema = new Schema({
        title:{type:String},
        url:String,
        status:{type:Number,default:0},
        create_time: {
            type: Date,
            default:()=>{
                return Date.now();
            },
            get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
        },
        download_time:{
            type: Date,
            get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
        },
        remark:String
    },
    { collection: 'spider',versionKey: false });    //不需要版本号     自行命名表
spiderSchema.set('toJSON', { getters: true,virtuals:false});
spiderSchema.set('toObject', { getters: true,virtuals:false});
let Spider = mongoose.model('Spider', spiderSchema);
module.exports =  Spider;
