"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
const uuid = require('uuid');

let categorySchema = new Schema({
        name: { type: String},    //标题
        create_time: {              //创建时间
            type: Date,
            default:()=>{
                return Date.now();
            },
        },
        url:String,
        status:{type:Number,default:1},
        column:[
            {
                name:String,
                url:String,
                status:{type:Number,default:1}
            }
        ]

    },
    { collection: 'category',versionKey: false });    //不需要版本号     自行命名表
categorySchema.set('toJSON', { getters: true, virtuals: false});
categorySchema.set('toObject', { getters: true, virtuals: false});
categorySchema.path('create_time').get(function (v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss')
});
let Category = mongoose.model('Category', categorySchema);
module.exports =  Category;
