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
                    //console.log($(".main-image p a img").attr("src"))
                    $("#pins li").each(async (index,element)=>{
                        //console.log($(element).children("a").attr("href"));
                        await getPic($(element).children("a").attr("href"));
                    });
                    //console.log("--------------");
                    //await fun(index+1);
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
                    const a = $(".pagenavi a").eq(-2).children("span").text();
                    const b =$(".main-title").text();
                    console.log(url);
                    console.log(a);
                    return;
                    if(b){
                        for(let i =1;i<=a;i++){
                            if(i===1){
                                await download(url,b)
                            }
                            else{
                                await download(`${url}/${i}`,b)
                            }
                        }
                    }

                    //console.log(b)
                }
            });
    }
}
async function download(url, title) {
    let json = {url: url, title: title};
    //console.log(json);
    console.log(json);
    //await spiderModel.add(json);
    /*await mq.sendQueueMsg("cos", JSON.stringify(json), (error) => {
        console.log(error);
    });*/

}


module.exports = async function () {
    let url='https://www.mzitu.com/page/';
    this.fun =async (index)=>{
        if(index<=332){
            console.log(`现在开始执行第${index}页`);
            if(index===1){
                await getInfo("https://www.mzitu.com",1)
            }
            else{
                await getInfo(url+index+"/",index);
            }

        }
        else{
            console.log(`已经结束`);
        }

    };
    await this.fun(1);
};
