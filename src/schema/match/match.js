"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let matchSchema = new Schema({
        title: { type: String },    //标题
        classify:{type:Schema.Types.ObjectId,ref:'Classify'},          //分类    关联到classify
        type:String,                  //比赛类型
        //start_time:Date,            //开始时间
        bestOf:Number,             //区分bo几
        team:[{type:Schema.Types.ObjectId}],     //对阵队伍
        children:[
            {
                start_time:Date,            //开始时间
                home:Schema.Types.ObjectId,       //主队id
                winner:{
                    _id:{type:Schema.Types.ObjectId,ref:"Team"},
                    result:String,                //得分
                    detail:[
                        {
                            player:{type:Schema.Types.ObjectId,ref:"Player"},
                            data:{}             //各项数据
                        }
                    ]
                },
                loser:{
                    _id:{type:Schema.Types.ObjectId,ref:"Team"},
                    result:String,                //得分
                    detail:[
                        {
                            player:{type:Schema.Types.ObjectId,ref:"Player"},
                            data:{}             //各项数据
                        }
                    ]
                }


            }
        ]
    },
    { collection: 'match',versionKey: false });    //不需要版本号     自行命名表
matchSchema.set('toJSON', { getters: true,virtuals:false});
matchSchema.set('toObject', { getters: true,virtuals:false});
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
let Match = mongoose.model('Match', matchSchema);
module.exports =  Match;
