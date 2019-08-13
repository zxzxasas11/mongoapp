const schedule = require('node-schedule');
const cheerio = require('cheerio');
const superagent = require('superagent');
const RabbitMQ = require('../util/Rabbitmq');
const ArticleModel =require('../module/article');
let mq = new RabbitMQ();

async function  recurse(url,name){
        superagent.get(url)
            .end((err, sres) => { //页面获取到的数据
                try {
                    if (sres !== undefined && sres !== null) {
                        let html = sres.text;             //整个页面html
                        let $ = cheerio.load(html, {
                            decodeEntities: false
                        });
                        let ahtml = $("#tpc .floor-show .floor_box .case").html();         //直接获取到了新闻页面
                        if (ahtml !== null) {
                            let params = {
                                title: name,
                                content: ahtml,
                                column_id: "5d48eb2f1ca2363924abe6d0",
                                creator: "5d491e03a232d01500c8dffd"
                            };
                            mq.sendQueueMsg("news", JSON.stringify(params), (error) => {
                                console.log(error);
                            });
                            console.log("成功插入一条队列");
                        } else {
                            $("a").each(async (index, element) => {
                                if ($(element).text() && $(element).attr("href")) {
                                    console.log("正在执行逐条查询");
                                    await recurse($(element).attr("href"), $(element).text())
                                }
                            });
                        }

                    }
                }catch (e) {
                    console.log(e);
                }
            });

}

async function custom(){
    await mq.receiveQueueMsg("news",async(msg)=>{
        try {
            let params = JSON.parse(msg);
            await ArticleModel.add(params);
        }catch (e) {
            console.log(e);
        }
    });
}

module.exports=async function(){
    /*try {
        await custom();
    }catch (e) {
        console.log(e);
    }*/
    try {
        await recurse("https://soccer.hupu.com/","");
    }catch (e) {
        console.log(e);
    }
    //await recurse("https://soccer.hupu.com/","");
    //schedule.scheduleJob('30 * * * * *',()=>{
        /*mq.receiveQueueMsg("news",async(msg)=>{
            try {
                console.log(msg)
                await spider(JSON.parse(msg));
            }catch (e) {
                console.log(e);
            }
        });*/
    //});
};
