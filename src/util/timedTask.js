const schedule = require('node-schedule');
const download = require('../spider/download')

module.exports=async function(){
    schedule.scheduleJob('30 * * * * *',async ()=>{
        await download();
    });
};
