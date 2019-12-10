"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
const uuid = require('uuid');
let collectSchema = new Schema({
        heroId: { type: Schema.Types.ObjectId,ref:'Hero'},    //帖子id
        creator:{type:Schema.Types.ObjectId,ref:'User'},      //创建人
        create_time: {              //创建时间
            type: Date,
            default:()=>{
                return Date.now();
            },
            get: v => moment(v).format('YYYY-MM-DD HH:mm')
        },
    },
    { collection: 'collect',versionKey: false });    //不需要版本号     自行命名表
let Collect = mongoose.model('Collect', collectSchema);
module.exports =  Collect;
