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
                    $(".comment-author-abu").each(async (index,element)=>{
                        let picurl = $(element).children("div").children("p").children("img").attr("src");
                        let title ="妹子自拍";
                        await download(picurl,title);
                    });
                    console.log("这一页已经完成");
                    if(url==="http://www.setuba.com/share/"){
                        await getInfo("http://www.setuba.com/share/index_2.html",2)
                    }
                    else{
                        await getInfo("http://www.setuba.com/share/index_"+(index+1)+".html",(index+1))
                    }

                    /*const picUrl = $(".ArticlePicBox div a img").attr("src");
                    const title =$(".articleTop h1").text();
                    const nextUrl = $(".ArticlePicBox div a").attr("href");
                    //console.log(url,title,nextUrl);
                    await download(picUrl,title,url);*/
                    //await getInfo(nextUrl);
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
    const url = "http://www.setuba.com/share/";

    await getInfo(url,1);
};
