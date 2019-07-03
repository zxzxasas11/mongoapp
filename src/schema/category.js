"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
const uuid = require('uuid');

let categorySchema = new Schema({
        category_id: {
            type: String,
            default:uuid.v1().replace(/-/g,"")
        },
        name: { type: String},    //标题
        create_time: {              //创建时间
            type: Date,
            default:new Date(),
        },
        url:String,
        status:{type:Number,default:1},
        column:[
            {
                column_id:{
                    type:String,
                    default:()=>{
                        return uuid.v1().replace(/-/g,"")
                    }
                },
                column_name:String,
                column_url:String,
                subclass:[
                    {
                        class_id:{
                            type:String,
                            default:()=>{
                                return uuid.v1().replace(/-/g,"")
                            }
                        },
                        class_name:String,
                        class_url:String,
                        status:{
                            type:Number,
                            default:1
                        }
                    }
                ],
                status:{type:Number,default:1}
            }
        ]

    },
    { collection: 'category',versionKey: false });    //不需要版本号     自行命名表

let Category = mongoose.model('Category', categorySchema);
module.exports =  Category;
