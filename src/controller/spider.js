const CreateFs = require('../util/upload');
const cheerio = require('cheerio');
const superagent = require('superagent');
const fs = require('fs');
const RabbitMQ = require('../util/Rabbitmq');
const moment = require('moment');
const spider = require('../spider/getAiTuBa');
const spiderTuba = require('../spider/getTuba')
const spiderZiPai = require('../spider/getZiPai')
const download = require('../spider/download')
const getPic =require("../util/getPic");
const JDLY =require("../spider/getJDLY")
class SpiderController{
    /**
     * 爬虫获取
     * @param ctx
     * @returns {Promise<void>}
     */
    static async spider(ctx){
        let url = ctx.request.body.url;
        superagent.get(url)
            .end((err, sres) => { //页面获取到的数据
                if(sres!==undefined&&sres!==null) {
                    let html = sres.text;
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    let mq = new RabbitMQ();
                    $("a").each((index, element) => {
                        if ($(element).text() && $(element).attr("href")) {
                            let queue = {name: $(element).text(), url: $(element).attr("href")};
                            mq.sendQueueMsg("news", JSON.stringify(queue), (error) => {
                                console.log(error);
                            });
                        }
                    });
                }
            });
    }

    static async getSpider(ctx){
        await spider();
    }

    static async getTuba(ctx){
        await spiderTuba();
    }
    static async getZiPai(ctx){
        await spiderZiPai();
    }
    static async getCos(){
        await getPic();
    }

    static async getJDLY(){
        await JDLY();
    }

    /**
     * 下载文件
     * @param ctx
     * @returns {Promise<void>}
     */
    static async download(ctx){
        await download();
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "爬取成功"
        };

    }
}
module.exports = SpiderController;


