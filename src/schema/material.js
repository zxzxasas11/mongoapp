"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let materialSchema = new Schema({
        name: { type: String },    //名称
        birthplace:[String],       //哪里刷
        pic:String
    },
    { collection: 'material',versionKey: false });    //不需要版本号     自行命名表
materialSchema.set('toJSON', { getters: true,virtuals:false});
materialSchema.set('toObject', { getters: true,virtuals:false});
let Material = mongoose.model('Material', materialSchema);
module.exports =  Material;
