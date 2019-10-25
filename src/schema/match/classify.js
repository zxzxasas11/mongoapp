"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let classifySchema = new Schema({
        name: { type: String },    //分类名称  NBA DOTA
        describe:String             //描述
    },
    { collection: 'classify',versionKey: false });    //不需要版本号     自行命名表
classifySchema.set('toJSON', { getters: true,virtuals:false});
classifySchema.set('toObject', { getters: true,virtuals:false});
let Classify = mongoose.model('Type', classifySchema);
module.exports =  Classify;
