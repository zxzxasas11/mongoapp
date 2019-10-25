"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
    let teamSchema = new Schema({
        name: { type: String },    //队伍名称
        nickName:[{type:String}],  //队伍别名
        area:String,               //赛区    NBA:  东部  西部   dota:独联体赛区
        type:{type:Schema.Types.ObjectId,ref:'Classify'}     //关联到分类
    },
    { collection: 'team',versionKey: false });    //不需要版本号     自行命名表
teamSchema.set('toJSON', { getters: true,virtuals:false});
teamSchema.set('toObject', { getters: true,virtuals:false});
let Team = mongoose.model('Type', teamSchema);
module.exports =  Team;
