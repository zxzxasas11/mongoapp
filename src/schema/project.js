"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let projectSchema = new Schema({
        name: String,    //名称
        code:{
            type: Number//, default: 10000
        },
        creator:{type:Schema.Types.ObjectId,ref:'User'},      //创建人
        updater:{type:Schema.Types.ObjectId,ref:'User'},      //更新人
        member:[{type:Schema.Types.ObjectId,ref:'User'}],     //成员
        category:[                                           //菜单
            {
                name:String,
                path:[Schema.Types.ObjectId]
            }
        ],
        api:[{
                name:{type:String},
                protocol:String,                  // http https
                method:String,
                url:String,
                category:[Schema.Types.ObjectId],    //所有级别的菜单id
                parameter:{},                       //存储所有字段
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
                    get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
                },
            }],
        applyList:[                                          //申请列表
            {
                proposerId:{type:Schema.Types.ObjectId,ref:'User'},
                status:{type:Number,default:0}                            //申请状态   0申请 1被拒绝  2通过
            }
        ],
        create_time: {              //创建时间
            type: Date,
            default:()=>{
                return Date.now();
            },
            get: v => moment(v).format('YYYY-MM-DD')
        },
        update_time:{
            type:Date,
            get: v => moment(v).format('YYYY-MM-DD HH:mm')
        }
    },
    { collection: 'project',versionKey: false });    //不需要版本号     自行命名表
projectSchema.set('toJSON', { getters: true,virtuals:false});
projectSchema.set('toObject', { getters: true,virtuals:false});
let Project = mongoose.model('Project', projectSchema);
module.exports =  Project;
