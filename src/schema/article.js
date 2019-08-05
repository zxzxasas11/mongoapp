"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let articleSchema = new Schema({
        title: { type: String },    //标题
        content:{type:String},
        creator:{type:Schema.Types.ObjectId,ref:'User'},      //创建人
        column_id:{type:Schema.Types.ObjectId,ref:'Category'},  //子栏目id
        view:{type:Number,default:0},
        url:{type:String},
        top:{type:Number,default:0},          //置顶
        essence:{type:Number,default:0},      //加精
        flag:{type:Number,default:0},         //0正常  1锁定  2锁帖(关闭评论,但仍可见)
        create_time: {              //创建时间
            type: Date,
            default:()=>{
                return Date.now();
            },
            get: v => moment(v).format('YYYY-MM-DD HH:mm')
        },
        update_time:{
            type: Date,
            default:()=>{
                return Date.now();
            },
            get: v => moment(v).format('YYYY-MM-DD HH:mm')
        },
        comments:[
            {
                content:String,
                creator:{type:Schema.Types.ObjectId,ref:"User"},
                imgList:[String],
                create_time:{
                    type: Date,
                    default:()=>{
                        return Date.now();
                    },
                    //get: v => moment(v).format('YYYY-MM-DD HH:mm')
                },
            }
        ]
    },
    { collection: 'article',versionKey: false });    //不需要版本号     自行命名表
articleSchema.set('toJSON', { getters: true,virtuals:false});
articleSchema.set('toObject', { getters: true,virtuals:false});
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
let Article = mongoose.model('Article', articleSchema);
module.exports =  Article;
