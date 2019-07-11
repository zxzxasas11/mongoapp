"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let logSchema = new Schema({
        level: {type: String},
        message: {type: String},
        info: {
            method: String,
            url: String,
            costTime: Number,
            body: String,
            response: {
                status: Number,
                message: String,
                header: String,
                body: String
            }
        }
    },
    { collection: 'log',versionKey: false });    //不需要版本号     自行命名表
let Log = mongoose.model('Log', logSchema);
module.exports =  Log;
