const schedule = require('node-schedule');
const JDLYevery = require('../spider/JDLYevery');

module.exports=async function(){
    schedule.scheduleJob('00 00 15 * * *',async ()=>{
        await JDLYevery();
    });
};
