"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
let playerSchema = new Schema({
        name: { type: String },    //选手名称
        detail:{                   //详细信息

        }
    },
    { collection: 'player',versionKey: false });    //不需要版本号     自行命名表
playerSchema.set('toJSON', { getters: true,virtuals:false});
playerSchema.set('toObject', { getters: true,virtuals:false});
let Player = mongoose.model('Player', playerSchema);
module.exports =  Player;
