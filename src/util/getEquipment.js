const schedule = require('node-schedule');
const cheerio = require('cheerio');
const superagent = require('superagent');
const RabbitMQ = require('../util/Rabbitmq');
const EquipmentModel =require('../module/equipment');
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
                    let info = JSON.parse(html);
                    for(let i in info.data){
                        let obj = {
                            code:parseInt(info.data[i].equipid),
                            name:decodeUnicode(info.data[i].name),
                            portrait:dele(info.data[i].icon),
                            star:info.data[i].star,
                            skill:"https://cdn.umowang.com/media/fgo/skill/"+info.data[i].skill_icon,
                            effect:splitByBr(decodeUnicode(info.data[i].skill_e))
                        };
                        await getInfo(info.data[i].id,obj);

                    }
                }
                else{
                    console.log("这个没有")
                }
            }catch (e) {
                console.log(e);
            }
        });
}

async function getInfo(id,obj){
    superagent.get("https://fgo.umowang.com/equipment/"+id)
        .end(async (err, sres) => { //页面获取到的数据
            try {
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    //let a = $(".yl-focus>img").attr("src");
                    //$(".yl-focus>img").attr("src");
                    //获取基本信息
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

function splitByBr(str){
    const sp = "<br>";
    //let arr = [];
    let arr = str.split("<br>");
    if(arr.length>1){
        arr.splice(arr.length-1,1);
    }
    return arr;
}

module.exports=async function(){
    /*for(let i =1;i<70;i++){
        let url = "https://fgo.umowang.com/equipment/ajax?wd=&ids=&sort=12958&o=desc&pn="+i;
        await getId(url);
    }*/
    await mq.receiveQueueMsg("equipment",async(msg)=>{
        try {
            let params = JSON.parse(msg);
            await EquipmentModel.add(params);
        }catch (e) {
            console.log(e);
        }
    });
};
