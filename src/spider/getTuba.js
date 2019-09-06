const schedule = require('node-schedule');
const cheerio = require('cheerio');
const charset = require('superagent-charset');
const fs = require("fs");
const superagent = charset(require('superagent'));
const request = require("request");
const spiderModel = require('../module/spider');

const httpUrl = "http://www.setuba.com";
async function getInfo(url) {
    if (url !== undefined && url) {
        superagent.get(url).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    $("#pins li").each(async (index,element)=>{
                        await getDetail(httpUrl+$(element).children("a").attr("href"));
                    })
                    //await getInfo(nextUrl);
                }
            });
    }

}

async function getDetail(url){
    if (url !== undefined && url) {
        superagent.get(url).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    const picUrl = $(".main-image p a img").attr("src");
                    const title =$(".main-title").text();
                    const nextUrl =httpUrl+ $(".main-image p a ").attr("href");
                    await download(picUrl,title,nextUrl);
                }
            });
    }
}
async function download(url, title,nextUrl) {
    let json = {url: url, title: title};
    let data = await spiderModel.add(json);
    if(data==='have'){
    }
    else{
        await getDetail(nextUrl);
    }
    /*await mq.sendQueueMsg("cos", JSON.stringify(json), (error) => {
        console.log(error);
    });*/
}

//去除\符号
function dele(str) {
    return str.replace(/[\'\"\\\\\/\/|/|/*//?//"///'/:/b\f\n\r\t]/g, '');
}

module.exports = async function () {
    const url = "http://www.setuba.com/";
    await getInfo(url);


};
