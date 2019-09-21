const schedule = require('node-schedule');
const download = require('../spider/download')
const JDLYevery = require('../spider/JDLYevery');

module.exports=async function(){
    schedule.scheduleJob('00 00 15 * * *',async ()=>{
        await JDLYevery();
    });
};
