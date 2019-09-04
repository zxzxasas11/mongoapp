const schedule = require('node-schedule');
const cheerio = require('cheerio');
//const superagent = require('superagent');
const charset = require('superagent-charset');
const fs = require("fs");
const superagent = charset(require('superagent'));
const request =require("request");
const RabbitMQ = require('../util/Rabbitmq');
let mq = new RabbitMQ();
async function getMaterial(url){
    superagent.get(url).charset('gbk')
        .end((err, sres) => { //页面获取到的数据
            let html = sres.text;             //整个页面html
            let $ = cheerio.load(html, {
                decodeEntities: false
            });
            $(".mw-collapsible tbody tr").each((index, element)=>{
                if($(element).children("td")){
                    let a = {};
                    $(element).children("td").each((i,element)=>{
                        switch (i) {
                            case 0:
                                a.pic="https://fgo.wiki"+$(element).children("a").children("img").attr("src");
                                break;
                            case 1:
                                a.name = $(element).children("a").text();
                                break;
                            case 2:
                                a.achieving=[];
                                //a.achieving.push($(element).children("a").text()||$(element).text());
                                if($(element).children("a").text()){
                                    $(element).children("a").each((index,element)=>{
                                        a.achieving.push($(element).text());
                                    });
                                }
                                else{
                                    $(element).each((index,element)=>{
                                        a.achieving.push($(element).text());
                                    });
                                }

                                break;
                        }
                    });
                    mq.sendQueueMsg("material",JSON.stringify(a), (error) => {
                        console.log(error);
                    })
                }
            });
        });
}
 function getUrl(url){
    superagent.get(url).charset("gbk")
        .end((err, sres) => { //页面获取到的数据
            let html = sres.text;             //整个页面html
            let $ = cheerio.load(html, {
                decodeEntities: false
            });
            /*$(".bbf_picli_bsd ul li").each( (index, element)=>{
                //console.log($(element).children("a").attr("href"));
                 getInfo($(element).children("a").attr("href"))
            });*/
            $("#waterfall li").each((index, element)=>{
                console.log($(element).children(".cl").children("a").attr("href"));
                getInfo($(element).children(".cl").children("a").attr("href"))
                /*if(index===0){
                    $(element).children("div").children("ignore_js_op").children("img").each((index,element)=>{
                        //download("http://www.chinagirlol.cc/"+$(element).attr("zoomfile"),$("#thread_subject").text())
                    })
                }*/
            });
        });
}

 function getInfo(url){
    superagent.get(url).charset("gbk")
        .end((err, sres) => { //页面获取到的数据
            let html = sres.text;             //整个页面html
            let $ = cheerio.load(html, {
                decodeEntities: false
            });
            console.log($("#thread_subject").text())
            $(".t_f").each((index, element)=>{
                if(index===0){
                    $(element).children("div").children("ignore_js_op").children("img").each((index,element)=>{
                        download("http://www.chinagirlol.cc/"+$(element).attr("zoomfile"),$("#thread_subject").text())
                    })
                }
            });
        });
}

 function download(url,title){
    let index=url.lastIndexOf("/");
    let fileName = url.substring(index+1);
    title = dele(title);
    title = title.replace(/\s*/g,"");
    let p = `c:/ccc/${title}/`;
    try {
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }catch (e) {
        console.log(e);
    }
    //let filename = '2.jpg';
    request(url).pipe(fs.createWriteStream(p+ fileName));
}
//去除\符号
function dele(str){
    return str.replace(/[\'\"\\\\\/\/|/|//'/:/b\f\n\r\t]/g, '');
}
module.exports= function(){
    const url = "http://www.chinagirlol.cc/";
     //getUrl(url);
    for(let i =0;i<28;i++){
        getUrl("http://www.chinagirlol.cc/forum-112-"+i+".html")
    }
};
