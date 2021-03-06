"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let equipmentSchema = new Schema(
    {
        code:Number,
        portrait:String,
        img:String,
        name: { type: String },    //标题
        star:{type:Number},        //星级
        hp:String,                 //血量
        atk:String,                //攻击
        skill:String,              //技能
        effect:[
            String
        ],             //效果
        introduction:{type:String},    //礼装介绍
        cost:Number,               //cost
        author:String,             //画师
    },
    { collection: 'equipment',versionKey: false });    //不需要版本号     自行命名表
equipmentSchema.set('toJSON', { getters: true,virtuals:false});
equipmentSchema.set('toObject', { getters: true,virtuals:false});
let Equipment = mongoose.model('Equipment', equipmentSchema);
module.exports =  Equipment;
