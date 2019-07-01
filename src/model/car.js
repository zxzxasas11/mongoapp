"use strict";
const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
//汽车
let carSchema = new Schema({
    car_id: { type: String },
    //car_id: { type: Schema.Types.ObjectId },
    car_name: { type: String },
    create_time: {
        type: Date,
        default:Date.now(),
        get: v => moment(v).format('YYYY-MM-DD HH:mm')
    },
},
    {versionKey: false});



/*carSchema.path('create_time').get(function (v) {
    return moment(v).format('YYYY-MM-DD HH:mm');
});*/
/*const model = {
    Car: mongoose.model('User', carSchema)
}*/
module.exports =  mongoose.model('Car', carSchema);
