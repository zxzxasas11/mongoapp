"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
const uuid = require('uuid');
let userSchema = new Schema({
    user_id: {
        type: String,
        default:()=>{
            return uuid.v1().replace(/-/g,"")
        }
    },
    username: { type: String },
    code:{type:String},
    password:{type:String},
    sex:Number,
    email:String,
    phone:String,
    power:{
        type:Number,
        default:0
    },
    coin:{
        type:Number,
        default: 0
    },
    create_time: {
        type: Date,
        default:Date.now(),
    },
},
    { collection: 'user',versionKey: false });    //不需要版本号


userSchema.set('toJSON', { getters: true, virtuals: true});
userSchema.set('toObject', { getters: true, virtuals: true});
userSchema.path('create_time').get(function (v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss')
});
let User = mongoose.model('User', userSchema);
module.exports =  User;
