const schedule = require('node-schedule');
const JDLYevery = require('../spider/JDLYevery');
const MEZIevery = require('../spider/fixMeizitu');
module.exports=async function(){
    schedule.scheduleJob('00 00 12 * * *',async ()=>{
        await JDLYevery();
    });

    schedule.scheduleJob('00 00 13 * * *',async ()=>{
        await MEZIevery();
    });
};
