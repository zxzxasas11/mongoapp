const schedule = require('node-schedule');
const cheerio = require('cheerio');
const charset = require('superagent-charset');
const fs = require("fs");
const superagent = charset(require('superagent'));
const request = require("request");
const spiderModel = require('../module/spider');


async function getInfo(url,index) {
    if (url !== undefined && url) {
        superagent.get(url).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    $(".thumb").each(async (index,element)=>{
                        //console.log($(element).children("a").attr("href"));
                        await getPic($(element).children("a").attr("href"))
                    });
                    await fun(index+1);
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
                    //console.log(url);
                    //console.log($(".entry-title").text());
                    let size = 0;
                    $("#content-innerText").children("p").children("img").each(async (index,element)=>{
                        await download($(element).attr("src"),$(".entry-title").text());
                        size++;
                    });
                    console.log(`本次添加${size}张图片`);
                }
            });
    }
}
async function download(url, title) {
    let json = {url: url, title: title};
    //console.log(json);
    await spiderModel.add(json);
    /*await mq.sendQueueMsg("cos", JSON.stringify(json), (error) => {
        console.log(error);
    });*/

}


module.exports = async function () {
    //const url = "https://www.jdlingyu.mobi/page/";
    //const url="https://www.jdlingyu.mobi/collection/trait/page";
    //const url="https://www.jdlingyu.mobi/collection/zipai/page";
    //const url="https://www.jdlingyu.mobi/collection/cos/page";
    //const url='https://www.jdlingyu.mobi/collection/hentai/page';
    //const url='https://www.jdlingyu.mobi/collection/meizitu/page';
    //const url='https://www.jdlingyu.mobi/collection/sifang/page';
    //const url='https://www.jdlingyu.mobi/tuji/hentai/gctt/page';
    //const url='https://www.jdlingyu.mobi/tuji/hentai/rbxz/page';
    const url='https://www.jdlingyu.mobi/tuji/page';
    this.fun =async (index)=>{
        //if(index<=97){
        //if(index<=110){
        //if(index<=9){
        //if(index<=100){
        //if(index<=95){
        //if(index<=91){
        //if(index<=12){
        //if(index<=69){
        //if(index<=19){
        if(index<=332){
            console.log(`现在开始执行第${index}页`);
            await getInfo(url+index,index);
        }
        else{
            console.log(`已经结束`);
        }

    };
    await this.fun(1);
};
