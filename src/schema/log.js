"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let logSchema = new Schema({
        level: {type: String},
        message: {type: String},
        method: String,
        url: String,
        username:String,
        host:String,
        costTime: Number,
        requestTime:Date,
        status: Number,
        description:String,
        body:{}
    },
    { collection: 'log',versionKey: false });    //不需要版本号     自行命名表
let Log = mongoose.model('Log', logSchema);
module.exports =  Log;
