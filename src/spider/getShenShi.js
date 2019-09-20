const schedule = require('node-schedule');
const cheerio = require('cheerio');
const charset = require('superagent-charset');
const fs = require("fs");
const superagent = charset(require('superagent'));
const request = require("request");
const spiderModel = require('../module/spider');

//获得每页的分页
async function getInfo(url,index) {
    if (url !== undefined && url) {
        superagent.get(url).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    let arr=[];
                    $(".bg-stuff").each((index,element)=>{
                        arr.push($(element).children("a").attr("href"));
                    });
                    await getPic(arr);
                    console.log(`第${index}页下载完成`)
                    //await getArr(index+1);
                }
            });
    }

}

//点击详情
async function getPic(arr){
    for(let i in arr){

        if (arr[i] !== undefined && arr[i]) {
            superagent.get(arr[i]).charset("utf-8").buffer(true)
                .end(async (err, sres) => { //页面获取到的数据
                    if (sres !== undefined && sres !== null) {
                        let html = sres.text;             //整个页面html
                        let $ = cheerio.load(html, {
                            decodeEntities: false
                        });
                        let title = $(".insidepost").text();
                        let size =0;
                        $(".entry-content img").each(async (index,element)=>{
                            await download($(element).attr("src"),title);
                        });
                        console.log(`完成执行${arr[i]}`)
                        /*$(".bg-stuff").each((index,element)=>{
                            arr.push($(element).children("a").attr("href"));
                        });*/
                    }
                });
        }
    }
}

async function download(url, title) {
    let json = {url: url, title: title};
    console.log(url);
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
    this.getArr =async function(index){
        await getInfo("https://www.anzhuo52.com/?cat=3&paged="+index,index);
    }
    await this.getArr(1);

};
