const schedule = require('node-schedule');
const cheerio = require('cheerio');
//const superagent = require('superagent');
const charset = require('superagent-charset');
const fs = require("fs");
const superagent = charset(require('superagent'));
const request =require("request");
const RabbitMQ = require('../util/Rabbitmq');
let mq = new RabbitMQ();
  function getUrl(url){
     if(url!==undefined&&url) {
         superagent.get(url).charset("gbk").timeout({
             response: 5000,  // Wait 5 seconds for the server to start sending,
             deadline: 60000, // but allow 1 minute for the file to finish loading.
         }).buffer(true)
             .end((err, sres) => { //页面获取到的数据
                 if (sres !== undefined && sres !== null) {
                     let html = sres.text;             //整个页面html
                     let $ = cheerio.load(html, {
                         decodeEntities: false
                     });
                     /*$(".bbf_picli_bsd ul li").each( (index, element)=>{
                         //console.log($(element).children("a").attr("href"));
                          getInfo($(element).children("a").attr("href"))
                     });*/
                     $("#waterfall li").each(  (index, element) => {
                            getInfo($(element).children(".cl").children("a").attr("href"))
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

  function getInfo(url){
    if(url!==undefined&&url){
         superagent.get(url).charset("gbk").timeout({
             response: 5000,  // Wait 5 seconds for the server to start sending,
             deadline: 60000, // but allow 1 minute for the file to finish loading.
         }).buffer(true)
             .end((err, sres) => { //页面获取到的数据
                 if (sres !== undefined && sres !== null) {
                     let html = sres.text;             //整个页面html
                     let $ = cheerio.load(html, {
                         decodeEntities: false
                     });
                     $(".t_f").each((index, element)=>{
                         if(index===0){
                             $(element).children("div").children("ignore_js_op").children("img").each(  (index,element)=>{
                                    download("http://www.chinagirlol.cc/"+$(element).attr("zoomfile"),$("#thread_subject").text())
                             })
                         }
                     });
                 }
             });
     }

}

  function download(url,title){
    let json = {url:url,title:title};
    console.log(json);
    mq.sendQueueMsg("cos",JSON.stringify(json), (error) => {
        console.log(error);
    });
    return;
    let index=url.lastIndexOf("/");
    let fileName = url.substring(index+1);
    title = dele(title);
    title = title.replace(/\s*/g,"");
    let p = `F:/ccc/${title}/`;
    try {
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }catch (e) {
        console.log(e);
    }
    //let filename = '2.jpg';
    try {
        request(url).pipe(fs.createWriteStream(p+ fileName));
        console.log("下载完成,路径为"+p+fileName)
    }catch (e) {
        console.log("下载出错"+url);
    }

}
//去除\符号
function dele(str){
    return str.replace(/[\'\"\\\\\/\/|/|/*//?//"///'/:/b\f\n\r\t]/g, '');
}
module.exports=  function(){
    const url = "http://www.chinagirlol.cc/";
     //getUrl(url);
    //28
    /*for(let i =0;i<28;i++){
           getUrl("http://www.chinagirlol.cc/forum-112-"+i+".html")
    }*/
    for(let i =0;i<88;i++){
           getUrl("http://www.chinagirlol.cc/forum-99-"+i+".html")
    }
    /*for(let i =0;i<37;i++){
           getUrl("http://www.chinagirlol.cc/forum-66-"+i+".html")
    }*/
};
