"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let spidererrSchema = new Schema({
        title:{type:String},
        url:String,
        status:{type:Number,default:0},          //5 存放的是页面链接    6 存放的是图片
        create_time: {
            type: Date,
            default:()=>{
                return Date.now();
            },
            get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
        },
        update_time: {
            type: Date,
            get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
        },
        remark:String
    },
    { collection: 'spidererr',versionKey: false });    //不需要版本号     自行命名表
spidererrSchema.set('toJSON', { getters: true,virtuals:false});
spidererrSchema.set('toObject', { getters: true,virtuals:false});
let Spidererr = mongoose.model('Spidererr', spidererrSchema);
module.exports =  Spidererr;
