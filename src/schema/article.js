"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
const uuid = require('uuid');
let articleSchema = new Schema({
        article_id: {
            type: String,
            default:uuid.v1().replace(/-/g,"")
        },
        title: { type: String },    //标题
        content:{type:String},
        creator:{type:String},      //创建人
        url:{type:String},
        create_time: {              //创建时间
            type: Date,
            default:new Date(),
        },
    },
    { collection: 'article',versionKey: false });    //不需要版本号     自行命名表

let Article = mongoose.model('Article', articleSchema);
module.exports =  Article;
