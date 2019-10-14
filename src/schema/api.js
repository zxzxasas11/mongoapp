"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let apiSchema = new Schema({
    name:{type:String},
    method:String,
    url:String,
    category:{
        type:Schema.Types.ObjectId,ref:"Project"
    },
    parameter:[
        {
            name:String,               //参数名
            describe:String,           //描述
            required:Boolean,          //是否必填
            sample:String,             //示例
            type:String                //类型
        }
    ],
    status:{                           //0 未启用  1 废弃  2启用
        type:Number,
        default:2
    },
    updater:{                //更新人id
        type:Schema.Types.ObjectId,ref:"User"
    },
    update_time:{
        type: Date,
        default:()=>{
            return Date.now();
        },
        get: v => moment(v).format('YYYY-MM-DD HH:mm')
    },
},
{ collection: 'api',versionKey: false });    //不需要版本号     自行命名表
apiSchema.set('toJSON', { getters: true,virtuals:false});
apiSchema.set('toObject', { getters: true,virtuals:false});
let Api = mongoose.model('Role', apiSchema);
module.exports =  Api;
