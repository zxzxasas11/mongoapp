"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let heroSchema = new Schema({
        name: { type: String },    //名称
        type:{type:String},        //区分类型
        star:Number,               //星级
        property:String,           //天地恶
        ATK:Number,
        HP:Number,
        achieving:String,          //获取途径
        pic:String,
        skill:[{
            name:String,
            describe:String
        }],
        break_materials:[         //突破材料
            {
                level:Number,
                material:{type:Schema.Types.ObjectId},      //材料名称
                quantity:Number
            }
        ],
        skill_materials:[        //技能升级材料
            {
                level:Number,
                material:{type:Schema.Types.ObjectId},      //材料名称
                quantity:Number
            }
        ],
    },
    { collection: 'hero',versionKey: false });    //不需要版本号     自行命名表
heroSchema.set('toJSON', { getters: true,virtuals:false});
heroSchema.set('toObject', { getters: true,virtuals:false});
let Hero = mongoose.model('Hero', heroSchema);
module.exports =  Hero;
