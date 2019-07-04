"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
const uuid = require('uuid');
let articleSchema = new Schema({
        title: { type: String },    //标题
        content:{type:String},
        creator:{type:String},      //创建人
        url:{type:String},
        create_time: {              //创建时间
            type: Date,
            default:()=>{
                return Date.now();
            },
        },
    },
    { collection: 'article',versionKey: false });    //不需要版本号     自行命名表
articleSchema.set('toJSON', { getters: true, virtuals: false});
articleSchema.set('toObject', { getters: true, virtuals: false});
articleSchema.path('create_time').get(function (v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss')
});
let Article = mongoose.model('Article', articleSchema);
module.exports =  Article;
