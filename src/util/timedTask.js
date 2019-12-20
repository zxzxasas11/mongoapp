const schedule = require('node-schedule');
const JDLYevery = require('../spider/JDLYevery');
const MEZIevery = require('../spider/fixMeizitu');
const MEZIevery1 = require('../spider/getPic');
module.exports=async function(){
    schedule.scheduleJob('00 00 15 * * *',async ()=>{
        await JDLYevery();
    });
    //MEZIevery1
    schedule.scheduleJob('00 00 13 * * *',async ()=>{
        await MEZIevery1();
    });
    schedule.scheduleJob('00 21 16 * * *',async ()=>{
        await MEZIevery();
    });
};
