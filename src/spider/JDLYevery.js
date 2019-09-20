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
                    console.log(`正在执行的页面为${url}`);
                    $(".thumb").each(async (index,element)=>{
                        await getPic($(element).children("a").attr("href"))
                    });
                }
            });
    }

}
async function getPic(url){
    if (url !== undefined && url) {
        superagent.get(url).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    $("#content-innerText").children("p").children("img").each(async (index,element)=>{
                        await download($(element).attr("src"),$(".entry-title").text());
                    });
                }
            });
    }
}
async function download(url, title) {
    let json = {url: url, title: title};
    await spiderModel.add(json);
}


module.exports = async function () {
    const arr=[
        'https://www.jdlingyu.mobi',
        'https://www.jdlingyu.mobi/collection/trait',
        'https://www.jdlingyu.mobi/collection/zipai',
        'https://www.jdlingyu.mobi/collection/cos',
        'https://www.jdlingyu.mobi/collection/hentai',
        'https://www.jdlingyu.mobi/collection/sifang',
        'https://www.jdlingyu.mobi/tuji/hentai/gctt',
        'https://www.jdlingyu.mobi/tuji/hentai/rbxz',
        'https://www.jdlingyu.mobi/tuji'
    ];
    for(let i in arr){
        await getInfo(arr[i]);
    }
};
