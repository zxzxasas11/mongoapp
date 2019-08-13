const schedule = require('node-schedule');
const cheerio = require('cheerio');
const superagent = require('superagent');
const RabbitMQ = require('../util/Rabbitmq');
let mq = new RabbitMQ();
async function getHero(url){
    superagent.get(url)
        .end(async (err, sres) => { //页面获取到的数据
            try {
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    $("#list table").each((index,element)=>{
                        console.log($(element).html());
                        return;
                        $(element).children("td").each((index,element)=>{
                            console.log($(element).text());
                        })
                        //console.log($(element).html());
                    });
                }
            }catch (e) {
                console.log(e);
            }
        });
}

module.exports=async function(){
    const url = "https://fgo.wiki/w/%E8%8B%B1%E7%81%B5%E5%9B%BE%E9%89%B4";
    await getHero(url);
};
