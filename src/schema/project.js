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
        member:[{type:Schema.Types.ObjectId,ref:'User'}],     //成员
        category:[                                           //菜单
            {
                //_id:Schema.Types.ObjectId
                path:String,
                name:String,
            }
        ],
        applyList:[                                          //申请列表
            {
                proposerId:{type:Schema.Types.ObjectId,ref:'User'},
                status:Number                            //申请状态   0申请 1被拒绝  2通过
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
