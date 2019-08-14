const schedule = require('node-schedule');
const cheerio = require('cheerio');
const superagent = require('superagent');
const RabbitMQ = require('../util/Rabbitmq');
let mq = new RabbitMQ();
async function getHero(url){
    superagent.get(url)
        .end(async (err, sres) => { //页面获取到的数据
            try {
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    //https://fgo.umowang.com/servant/
                    console.log(html);
                    return;
                    $(".charactor-list tr").each((index,element)=>{
                        $(element).children("td").each((index,element)=>{
                            console.log($(element).text());
                        })
                        //console.log($(element).html());
                    });
                }
            }catch (e) {
                console.log(e);
            }
        });
}
//unicode转中文
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}

//去除\符号
function dele(str){
    return str.replace(/[\'\"\\\\b\f\n\r\t]/g, '');
}
module.exports=async function(){
    const url = "https://fgo.umowang.com/equipment/ajax?wd=&ids=&sort=12958&o=desc&pn=1";
    //console.log(String.fromCharCode("\u7ea6\u7ff0\u7684\u5934\u9885"));
    //console.log(("https:\\/\\/cdn.umowang.com\\/media\\/fgo\\/equip\\/head\\/1088.jpg").replace(/[\'\"\\\\b\f\n\r\t]/g, ''));
    //console.log(decodeUnicode("\u7ea6\u7ff0\u7684\u5934\u9885"));
    //console.log(dele("https:\\\\/\\\\/cdn.umowang.com\\\\/media\\\\/fgo\\\\/equip\\\\/head\\\\/1088.jpg"))
    await getHero(url);
};
