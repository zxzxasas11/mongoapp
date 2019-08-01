"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let roleSchema = new Schema({
        _id: { type: Number },
        name:{type:String},
        authority:[String]
    },
    { collection: 'role',versionKey: false });    //不需要版本号     自行命名表
roleSchema.set('toJSON', { getters: true,virtuals:false});
roleSchema.set('toObject', { getters: true,virtuals:false});
/*articleSchema.path('create_time').get(function (v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss')
});*/

//关联到非_id
/*articleSchema.virtual('members', {
    ref: 'Category', // 虚拟字段的model为Person
    localField: 'column_id', // 查找到Person.band的值和Band.name的值相等的项
    foreignField: 'column', //
    // justOne用于指定，返回的members是单个数据还是一个数组集合，justOne默认为false
    justOne: false
});*/
let Role = mongoose.model('Role', roleSchema);
module.exports =  Role;
