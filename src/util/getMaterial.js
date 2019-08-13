const schedule = require('node-schedule');
const cheerio = require('cheerio');
const superagent = require('superagent');
const RabbitMQ = require('../util/Rabbitmq');
let mq = new RabbitMQ();
async function getMaterial(url){
    superagent.get(url)
        .end((err, sres) => { //页面获取到的数据
            let html = sres.text;             //整个页面html
            let $ = cheerio.load(html, {
                decodeEntities: false
            });
            $(".mw-collapsible tbody tr").each((index, element)=>{
                    if($(element).children("td")){
                        let a = {};
                        $(element).children("td").each((i,element)=>{
                            switch (i) {
                                case 0:
                                    a.pic="https://fgo.wiki"+$(element).children("a").children("img").attr("src");
                                    break;
                                case 1:
                                    a.name = $(element).children("a").text();
                                    break;
                                case 2:
                                    a.achieving=[];
                                    //a.achieving.push($(element).children("a").text()||$(element).text());
                                    if($(element).children("a").text()){
                                        $(element).children("a").each((index,element)=>{
                                            a.achieving.push($(element).text());
                                        });
                                    }
                                    else{
                                        $(element).each((index,element)=>{
                                            a.achieving.push($(element).text());
                                        });
                                    }

                                    break;
                            }
                        });
                        mq.sendQueueMsg("material",JSON.stringify(a), (error) => {
                            console.log(error);
                        })
                    }
            });
        });
}

module.exports=async function(){
    const url = "https://fgo.wiki/w/%E9%81%93%E5%85%B7%E4%B8%80%E8%A7%88";
    await getMaterial(url);
};
