const cheerio = require('cheerio');
const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const spiderModel = require('../module/spider');
const spidererrModel = require('../module/spidererr');
let request = require('request');
let fs = require('fs');

async function getPic(json){
    if (json.url !== undefined && json.url) {
        superagent.get(json.url).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    const a = $(".pagenavi a").eq(-2).children("span").text();
                    const b =$(".main-title").text();
                    console.log(`${json.url}有${a}页`);
                    let page = 0 ;
                    new Promise(async function (resolve, reject) {
                        if(b){
                            for(let i =1;i<=a;i++){
                                if(i===1){
                                    await getImg(json.url,b).then(async res=>{
                                        await download(res);
                                        page++;
                                    })
                                }
                                else{
                                    await getImg(`${json.url}/${i}`,b).then(async res=>{
                                        await download(res);
                                        page++;
                                    },async err=>{
                                        console.log("出错图片为"+json.url+"/"+i);
                                        let data = {title:err.title,url:json.url+"/"+i,remark:"读取失败"};
                                        await spidererrModel.add(data);
                                    })
                                }
                            }
                        }
                        resolve({page:page});
                    }).then(async function (r) {
                        console.log(`本页执行完成:共${r.page}页`);
                        //await spidererrModel.edit(r.id,1)
                        //await pic();
                        //console.log('Done: ' + r);
                    }).catch(function (reason) {
                        //console.log('Failed: ' + reason);
                    });


                    //console.log(b)
                }
            });
    }
}

async function getImg(url,title){
    return new Promise(function (resolve, reject) {
        if (url !== undefined && url) {
            superagent.get(url).charset("utf-8").buffer(true).retry(10).timeout({
                response: 5000,  // Wait 5 seconds for the server to start sending,
                deadline: 60000, // but allow 1 minute for the file to finish loading.
            })
                .end(async (err, sres) => { //页面获取到的数据
                    if (sres !== undefined && sres !== null) {
                        let html = sres.text;             //整个页面html
                        let $ = cheerio.load(html, {
                            decodeEntities: false
                        });
                        let imgUrl = $(".main-image").find("img").attr("src");
                        if(title!==undefined&&imgUrl!==undefined){
                            resolve({referer:url,title:title,url:imgUrl});
                        }
                        else{
                            reject({title:title,url:imgUrl})
                        }
                    }
                });
        }

    }).then(function (r) {
        return r;
    })

}

async function download(json) {
    if(json.title!==undefined&&json.url!==undefined){
        await spiderModel.add(json);
    }
}
//获取页面首页的内容
async function getInfo(url,index) {
    return new Promise(function (resolve, reject) {
    if (url !== undefined && url) {
        superagent.get(url).charset("utf-8").buffer(true).retry(10)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    let size = 0;
                    $("#pins li").each(async (index,element)=>{
                        if($(element).children("a").children("img").attr("alt")!==undefined&&$(element).children("a").attr("href")!==undefined) {
                            let json = {
                                title:$(element).children("a").children("img").attr("alt"),
                                url:$(element).children("a").attr("href")
                            }
                            await getPic(json);
                            size++;
                        }
                        else{
                            reject("出错了")
                        }

                        //await getPic($(element).children("a").attr("href"));
                    });
                    resolve(size)

                    //await fun(index+1);
                }
            });
    }}).then(function (r) {
        console.log(r);
        console.log("---------------")
        return r;
    })

}

module.exports = async function () {
    this.pic = async ()=>{
        const remark ="未获取页码";
        let data = await spidererrModel.getOne(remark);
        if(data!==null){
            await getPic(data);
        }

    };
    await getInfo("https://www.mzitu.com",1);
};
