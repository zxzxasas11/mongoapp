"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let heroSchema = new Schema(
    {
        code:Number,
        portrait:String,           //头像
        img:[String],              //卡面  4破
        name: { type: String },    //名称
        type:{type:String},        //区分类型
        classes:String,                //职介
        card:{                     //红蓝绿卡数量
            buster:Number,
            arts:Number,
            quick:Number
        },
        star:Number,               //星级
        information:{
            sex:String,
            height:String,
            weight:String,
            camp:String,            //阵营
            area:String,            //区域
            origin:String,         //出处
            property:String,        //属性
            character:String,        //特性
            nickname:String,        //昵称
            author:String,          //绘师
            cv:String,              //cv
            access:String          //获取来源
        },
        HP: {
            basic:Number,
            final:Number,
            lv80:Number,
            lv90:Number,
            lv100:Number
        },
        ATK:{
            basic:Number,
            final:Number,
            lv80:Number,
            lv90:Number,
            lv100:Number
        },
        fetter_point:[String],       //羁绊点数
        fetter_reward:[String],
        NP_gain_rate:{              //NP获取率
            Arts:String,
            Buster:String,
            Quick:String,
            Extra:String,
            ultimate:String,             //宝具
            passive:String             //被动
        },
        hits:{
            Arts:String,
            Buster:String,
            Quick:String,
            Extra:String
        },
        value:{
            flexibility:String,            //筋力
            durability:String,           //耐久
            agility:String,              //敏捷
            magic:String,                //魔力
            fortune:String,                //幸运
            ultimate:String                //宝具
        },
        hidden_value:{
            dead_correct:String,          //即死补正
            star_rate:String,              //出星率
            star_focus_rate:String       //集星权重
        },
        ultimate:{                       //宝具
            card:String,
            name:String,
            hits:String,
            level:String,
            type:String,
            condition:String,
            fixed_effect:[
                {
                    description:String,
                    value:String
                }
            ],
            level_effect:{
                description:String,
                value:[String]
            },
            accumulate_effect:{                  //蓄力效果
                description:String,
                value:[String]
            }
        },
        /*break_materials:[         //突破材料
            {
                material:String,      //材料名称
                quantity:Number
            }
        ],*/
        break_materials:{
            first:[{
                material:String,      //材料名称
                quantity:Number
            }],
            second:[{
                material:String,      //材料名称
                quantity:Number
            }],
            third:[{
                material:String,      //材料名称
                quantity:Number
            }],
            final:[{
                material:String,      //材料名称
                quantity:Number
            }]
        },
        skill_materials:[        //技能升级材料
            {
                material:String,      //材料名称
                quantity:Number
            }
        ],




        //property:String,           //天地恶
        /*ATK:[Number],
        HP:[Number],
        achieving:String,          //获取途径
        pic:String,
        skill:[{
            name:String,
            describe:String
        }],
        break_materials:[         //突破材料
            {
                level:Number,
                material:{type:Schema.Types.ObjectId},      //材料名称
                quantity:Number
            }
        ],
        skill_materials:[        //技能升级材料
            {
                level:Number,
                material:{type:Schema.Types.ObjectId},      //材料名称
                quantity:Number
            }
        ],*/
    },
    { collection: 'hero',versionKey: false });    //不需要版本号     自行命名表
heroSchema.set('toJSON', { getters: true,virtuals:false});
heroSchema.set('toObject', { getters: true,virtuals:false});
let Hero = mongoose.model('Hero', heroSchema);
module.exports =  Hero;
