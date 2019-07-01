"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
const uuid = require('uuid');
//汽车
let userSchema = new Schema({
    user_id: {
        type: String,
        default:uuid.v1().replace(/-/g,"")
    },
    //car_id: { type: Schema.Types.ObjectId },
    username: { type: String },
    code:{type:String},
    password:{type:String},
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
        get: v => moment(v).format('YYYY-MM-DD HH:mm')
    },
},
    { collection: 'user',versionKey: false });    //不需要版本号



/*carSchema.path('create_time').get(function (v) {
    return moment(v).format('YYYY-MM-DD HH:mm');
});*/
/*const model = {
    Car: mongoose.model('User', carSchema)
}*/
module.exports =  mongoose.model('User', userSchema);
