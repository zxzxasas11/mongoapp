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
                        if(index===3){
                            $(element).children("td").each((index,element)=>{
                                if($(element).text()!==undefined){
                                    obj.information.origin = $(element).text();
                                }
                            });
                        }
                        if(index===5){
                            $(element).children("td").each((index,element)=>{
                                if($(element).text()!==undefined){
                                    switch (index) {
                                        case 0 :
                                            obj.information.property=$(element).text();
                                            break;
                                        case 1:
                                            obj.information.character=$(element).text();
                                            break;
                                        case 2:
                                            obj.information.nickname=$(element).text();
                                            break;
                                    }
                                }
                            });
                        }
                        if(index===7){
                            $(element).children("td").each((index,element)=>{
                                if($(element).text()!==undefined){
                                    switch (index) {
                                        case 0 :
                                            obj.information.author=$(element).text();
                                            break;
                                        case 1:
                                            obj.information.cv=$(element).text();
                                            break;
                                        case 2:
                                            obj.information.access=$(element).text();
                                            break;
                                    }
                                }
                            });
                        }
                    });
                    obj.HP={};
                    obj.ATK={};
                    obj.fetter_point=[];
                    obj.fetter_reward=[];
                    obj.NP_gain_rate={};
                    obj.hits={};
                    obj.value={};
                    obj.hidden_value={};
                    $(".uk-width-1-1 table tbody tr").each((index,element)=>{
                        if(index===1){
                            $(element).children("td").each((index,element)=>{
                                if($(element).text()!==undefined){
                                    switch (index) {
                                        case 0 :
                                            obj.HP.basic=$(element).text();
                                            break;
                                        case 1:
                                            obj.HP.final=$(element).text();
                                            break;
                                        case 2:
                                            obj.HP.lv80=$(element).text();
                                            break;
                                        case 3:
                                            obj.HP.lv90=$(element).text();
                                            break;
                                        case 4:
                                            obj.HP.lv100=$(element).text();
                                            break;
                                        case 5 :
                                            obj.ATK.basic=$(element).text();
                                            break;
                                        case 6:
                                            obj.ATK.final=$(element).text();
                                            break;
                                        case 7:
                                            obj.ATK.lv80=$(element).text();
                                            break;
                                        case 8:
                                            obj.ATK.lv90=$(element).text();
                                            break;
                                        case 9:
                                            obj.ATK.lv100=$(element).text();
                                            break;
                                    }
                                }
                            });
                        }
                        if(index===3){
                            $(element).children("td").each((index,element)=>{
                                if($(element).text()!==undefined&&$(element).text()!=='-'){
                                    obj.fetter_point.push($(element).text());
                                }
                            });
                        }
                        if(index===5){
                            $(element).children("td").each((index,element)=>{
                                if($(element).text()!==undefined&&$(element).text()!=='-'){
                                    obj.fetter_point.push($(element).text());
                                }
                            });
                        }
                        if(index===7){
                            $(element).children("td").each((index,element)=>{
                                if($(element).text()!==undefined&&$(element).text()!=='-'){
                                    obj.fetter_reward.push($(element).text());
                                }
                            });
                        }
                        if(index===9){
                            $(element).children("td").each((index,element)=>{
                                if($(element).text()!==undefined&&$(element).text()!=='-'){
                                    switch (index) {
                                        case 0:
                                            obj.NP_gain_rate.Arts= $(element).text();
                                            break;
                                        case 1:
                                            obj.NP_gain_rate.Buster= $(element).text();
                                            break;
                                        case 2:
                                            obj.NP_gain_rate.Quick= $(element).text();
                                            break;
                                        case 3:
                                            obj.NP_gain_rate.Extra= $(element).text();
                                            break;
                                        case 4:
                                            obj.NP_gain_rate.ultimate= $(element).text();
                                            break;
                                        case 5:
                                            obj.NP_gain_rate.passive= $(element).text();
                                            break;
                                        case 6:
                                            obj.hits.Arts= $(element).text();
                                            break;
                                        case 7:
                                            obj.hits.Buster= $(element).text();
                                            break;
                                        case 8:
                                            obj.hits.Quick= $(element).text();
                                            break;
                                        case 9:
                                            obj.hits.Extra= $(element).text();
                                            break;

                                    }
                                }
                            });
                        }
                        if(index===11){
                            $(element).children("td").each((index,element)=>{
                                if($(element).text()!==undefined&&$(element).text()!=='-'){
                                    switch (index) {
                                        case 0:
                                            obj.value.flexibility= $(element).text();
                                            break;
                                        case 1:
                                            obj.value.durability= $(element).text();
                                            break;
                                        case 2:
                                            obj.value.agility= $(element).text();
                                            break;
                                        case 3:
                                            obj.value.magic= $(element).text();
                                            break;
                                        case 4:
                                            obj.value.fortune= $(element).text();
                                            break;
                                        case 5:
                                            obj.value.ultimate= $(element).text();
                                            break;
                                        case 6:
                                            obj.hidden_value.dead_correct= $(element).text();
                                            break;
                                        case 7:
                                            obj.hidden_value.star_rate= $(element).text();
                                            break;
                                        case 8:
                                            obj.hidden_value.star_focus_rate= $(element).text();
                                            break;

                                    }
                                }
                            });
                        }
                    });
                    obj.break_materials=[];
                    $(".swiper-wrapper").each((index,element)=>{
                        //最后一个滑块  定位到材料轮播表格
                        if(index===2){
                            $(element).children(".swiper-slide").each((index,element)=>{
                                if(index===2){
                                    $(element).children(".content-slide").children("table").children("tbody").children("tr").each((index,element)=>{
                                        if(index===2){
                                            $(element).children("td").each((index,element)=> {
                                                if(index===1){
                                                    obj.break_materials.push(
                                                        {
                                                            material:$(element).children("div").children("img").attr("title"),
                                                            quantity:$(element).text()
                                                        }
                                                    );
                                                }
                                            })
                                        }
                                        if(index===3){
                                            $(element).children("td").each((index,element)=> {
                                                if(index===1){
                                                    obj.break_materials.push(
                                                        {
                                                            material:$(element).children("div").children("img").attr("title"),
                                                            quantity:$(element).text()
                                                        }
                                                    );
                                                }
                                            })
                                        }
                                        if(index===4){
                                            $(element).children("td").each((index,element)=> {
                                                if(index===1){
                                                    obj.break_materials.push(
                                                        {
                                                            material:$(element).children("div").children("img").attr("title"),
                                                            quantity:$(element).text()
                                                        }
                                                    );
                                                }
                                            })
                                        }
                                        if(index===5){
                                            $(element).children("td").each((index,element)=> {
                                                if(index===1){
                                                    obj.break_materials.push(
                                                        {
                                                            material:$(element).children("div").children("img").attr("title"),
                                                            quantity:$(element).text()
                                                        }
                                                    );
                                                }
                                            })
                                        }
                                    })
                                }
                            })
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
