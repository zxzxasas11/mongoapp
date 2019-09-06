const schedule = require('node-schedule');
const cheerio = require('cheerio');
//const superagent = require('superagent');
const charset = require('superagent-charset');
const fs = require("fs");
const superagent = charset(require('superagent'));
const request = require("request");
const RabbitMQ = require('../util/Rabbitmq');
let mq = new RabbitMQ();
const spiderModel = require('../module/spider');

async function getUrl(url) {
    if (url !== undefined && url) {
        superagent.get(url).charset("gbk").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    /*$(".bbf_picli_bsd ul li").each( (index, element)=>{
                        //console.log($(element).children("a").attr("href"));
                         getInfo($(element).children("a").attr("href"))
                    });*/
                    $("#waterfall li").each(async (index, element) => {
                        await getInfo($(element).children(".cl").children("a").attr("href"))
                        /*if(index===0){
                            $(element).children("div").children("ignore_js_op").children("img").each((index,element)=>{
                                //download("http://www.chinagirlol.cc/"+$(element).attr("zoomfile"),$("#thread_subject").text())
                            })
                        }*/
                    });
                }
            });
    }
}

async function getInfo(url) {
    if (url !== undefined && url) {
        superagent.get(url).charset("gbk").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    $(".t_f").each((index, element) => {
                        if (index === 0) {
                            $(element).children("div").children("ignore_js_op").children("img").each(async (index, element) => {
                                await download("http://www.chinagirlol.cc/" + $(element).attr("zoomfile"), $("#thread_subject").text())
                            })
                        }
                    });
                }
            });
    }

}

async function download(url, title) {
    let json = {url: url, title: title};
    await spiderModel.add(json);
    /*await mq.sendQueueMsg("cos", JSON.stringify(json), (error) => {
        console.log(error);
    });*/
}

//去除\符号
function dele(str) {
    return str.replace(/[\'\"\\\\\/\/|/|/*//?//"///'/:/b\f\n\r\t]/g, '');
}

module.exports = async function () {
    const url = "http://www.chinagirlol.cc/";
    //getUrl(url);
    //28
    for (let i = 0; i < 28; i++) {
        await getUrl("http://www.chinagirlol.cc/forum-112-" + i + ".html")
    }
    for (let i = 0; i < 88; i++) {
        await getUrl("http://www.chinagirlol.cc/forum-99-" + i + ".html")
    }
    for (let i = 0; i < 37; i++) {
        await getUrl("http://www.chinagirlol.cc/forum-66-" + i + ".html")
    }
};
