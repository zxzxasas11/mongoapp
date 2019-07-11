"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
const uuid = require('uuid');
let userSchema = new Schema({
    /*user_id: {
        type: Schema.Types.ObjectId,
        default:()=>{
            return uuid.v1().replace(/-/g,"")
        }
    },*/
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
        default:()=>{
            return Date.now();
        },
        get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
    },
},
    { collection: 'user',versionKey: false});    //不需要版本号


userSchema.set('toJSON', { getters: true,virtuals:false});
userSchema.set('toObject', { getters: true,virtuals:false});
let User = mongoose.model('User', userSchema);
module.exports =  User;
