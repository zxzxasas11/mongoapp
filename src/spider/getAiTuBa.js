const schedule = require('node-schedule');
const cheerio = require('cheerio');
const charset = require('superagent-charset');
const fs = require("fs");
const superagent = charset(require('superagent'));
const request = require("request");
const spiderModel = require('../module/spider');


async function getInfo(url) {
    if (url !== undefined && url) {
        superagent.get(url).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    const picUrl = $(".ArticlePicBox div a img").attr("src");
                    const title =$(".articleTop h1").text();
                    const nextUrl = $(".ArticlePicBox div a").attr("href");
                    //console.log(url,title,nextUrl);
                    await download(picUrl,title,url);
                    //await getInfo(nextUrl);
                }
            });
    }

}

async function download(url, title,nextUrl) {
    let json = {url: url, title: title};
    let data = await spiderModel.add(json);
    if(data==='have'){
        superagent.get(nextUrl).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    let random = Math.ceil(Math.random()*8);
                    $(".txt").each(async (index,element)=>{
                        if(index===random){
                            await getInfo($(element).attr("href"));
                        }
                    });
                    /*console.log($(".txt").attr("href"));
                    let next = $(".txt").attr("href");
                    await getInfo(next);*/
                }
            });
    }
    else{
        await getInfo(nextUrl);
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
    const url = "http://www.ituba.cc/sexy/59006.html";
    const arr=[
        "http://www.ituba.cc/siwa/68008.html",
        "http://www.ituba.cc/rihan/68017.html",
        "http://www.ituba.cc/model/67976.html",
        "http://www.ituba.cc/meinvtupian/qingchunmeinv/67880.html",
        "http://www.ituba.cc/meinvtaotu/67746.html",
        "http://www.ituba.cc/xiurenmote/68001.html",
    ];
    for(let i in arr){
        await getInfo(arr[i]);
    }


};
