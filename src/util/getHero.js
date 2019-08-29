const schedule = require('node-schedule');
const cheerio = require('cheerio');
const superagent = require('superagent');
const RabbitMQ = require('../util/Rabbitmq');
let mq = new RabbitMQ();
async function getId(url){
    superagent.get(url)
        .end(async (err, sres) => { //页面获取到的数据
            try {
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    //https://fgo.umowang.com/servant/
                    let info = JSON.parse(html);
                    for(let i in info.data){
                        let obj = {
                            code:parseInt(info.data[i].charid),
                            name:decodeUnicode(info.data[i].name),
                            portrait:dele(info.data[i].icon),
                            classes:info.data[i].classes,
                            star:parseInt(info.data[i].star),
                            card:{
                                buster:parseInt(info.data[i].cardbuster),
                                arts:parseInt(info.data[i].cardarts),
                                quick:parseInt(info.data[i].cardquick)
                            },
                        };
                        await getInfo(info.data[i].id,obj);
                    }
                }
            }catch (e) {
                console.log(e);
            }
        });
}


async function getInfo(id,obj){
    superagent.get("https://fgo.umowang.com/servant/"+id)
        .end(async (err, sres) => { //页面获取到的数据
            try {
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    obj.img=[];
                    $(".swiper-slide").each((index,element)=>{
                        if($(element).children("a").attr("href")!==undefined){
                            obj.img.push($(element).children("a").attr("href"))
                        }
                    });
                    obj.information ={};
                    $(".uk-width-large-1-12 table tbody tr").each((index,element)=>{
                        if(index===1){
                            $(element).children("td").each((index,element)=>{
                                if($(element).text()!==undefined){
                                    switch (index) {
                                        case 0:
                                            obj.information.sex = $(element).text();
                                            break;
                                        case 1:
                                            obj.information.height = $(element).text();
                                            break;
                                        case 2:
                                            obj.information.weight = $(element).text();
                                            break;
                                        case 3:
                                            obj.information.camp = $(element).text();
                                            break;
                                        case 4:
                                            obj.information.area = $(element).text();
                                            break;
                                    }
                                }

                            });
                        }
                    });
                    console.log(obj);
                    //let a = $(".yl-focus>img").attr("src");
                    //$(".yl-focus>img").attr("src");
                    //获取基本信息
                    return;
                    $(".uk-codex-table tbody tr").each((index,element)=>{
                        if(index===1){
                            $(element).children("td").each((index,element)=>{
                                switch (index) {
                                    case 0:
                                        obj.hp = $(element).text();
                                        break;
                                    case 1:
                                        obj.atk = $(element).text();
                                        break;
                                    case 2:
                                        obj.cost = $(element).text();
                                        break;
                                    case 3:
                                        obj.author = $(element).text();
                                        break;
                                }
                            })
                        }
                        if($(element).children("th").text()==="礼装介绍"){
                            obj.introduction = ($(element).next().children("td").html())
                        }
                    });
                }
                mq.sendQueueMsg("equipment",JSON.stringify(obj), (error) => {
                    console.log(error);
                })
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
    const url = "https://fgo.umowang.com/servant/ajax?card=&wd=&ids=&sort=12777&o=desc&pn=1";
    await getId(url);
    //await getInfo("94787",null);
};
