const cheerio = require('cheerio');
const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const spiderModel = require('../module/spider');
const spidererrModel = require('../module/spidererr');
let request = require('request');
let fs = require('fs');
let total = 0;
//获取每一页的信息
async function getList(url,index){
    return new Promise(function (resolve, reject) {
        if (url !== undefined && url) {
            superagent.get(url+index).charset("utf-8").buffer(true).retry(10).timeout({
                response: 5000,  // Wait 5 seconds for the server to start sending,
                deadline: 60000, // but allow 1 minute for the file to finish loading.
            })
                .end(async (err, sres) => { //页面获取到的数据
                    if (sres !== undefined && sres !== null) {
                        let html = sres.text;             //整个页面html
                        let $ = cheerio.load(html, {
                            decodeEntities: false
                        });
                        if($(".pagenavi a").eq(-1).attr("href")){
                            let size =0;    //记录总页码
                            const page = $(".pagenavi a").eq(-1).attr("href").split(url);
                            if(page[1]){
                                size=parseInt(page[1].replace("/",""));
                            }
                            else size=1;
                            $(".auth1").each(async (index,element)=>{
                                console.log(index);
                                console.log($(element).children("div").children("a").attr("href"));
                                await getImg($(element).children("div").children("a").attr("href")).then(res=>{
                                    console.log($(element).children("div").children("a").attr("href")+"页面有"+res+"张图片")
                                    total +=res;
                                });
                            });
                            resolve({url:url,index:index,page:size});
                        }
                        else reject('这一类没有内容')
                    }

                });
        }

    }).then(async function (r) {
        //console.log("这一页已经结束,共有"+r.page+"页");
        if(r.index+1 <=r.page){
            await getList(url,r.index+1)
        }
        return r;
    }).catch(res=>{
        console.log(res);
    })
}

async function getImg(url){
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
                        let size = 0;
                        let title  = $("title").text();
                        console.log(url);
                        $("#portfolio ul li img").each(async (index,element)=>{
                            if($(element).attr("src")){
                                let json={
                                    title:title,
                                    url:$(element).attr("src"),
                                    referer:url
                                };
                                await download(json);
                                size++;
                            }
                            else{
                                await spidererrModel.add({title:title,url:url,remark:`第${index+1}页图片读取失败`,status:5});
                                reject("获取图片失败")
                            }
                        });
                        resolve(size);
                    }
                });
        }

    }).then(async function (r) {
        //console.log("这一页已经结束,共有"+r+"张图片");
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
                    let arr=[];
                    //取得首页的8个分类
                    $(".inner.menu").children("ul").children("li").each((index,element)=>{
                        if(index>=1){
                            arr.push($(element).children("a").attr("href"))
                        }
                    });
                    resolve(arr)
                }
            });
    }}).then(function (r) {
        return r;
    })

}

module.exports = async function () {
    let current =0;
    this.pic = async ()=>{
        await getInfo("http://5199168.com").then(async res=>{
            if(current<=7){
                await getList(res[current],1).then(async res=>{
                    console.log("本次共"+total+"张");
                    current++;
                    await getList(res[current+1],1);
                });
            }
            /*await getList(res[current],1).then(res=>{
                console.log("本次共"+total+"张");

            });*/
            /*res.forEach((value,index)=>{
                getList(value,1).then(res=>{
                    console.log("____________________________");
                    console.log("本次共"+total+"张")
                });
            })*/
            /*await getList(res[7],1).then(res=>{
                console.log("+++++++++");
                console.log("本次共"+total+"张")
            });*/
           //console.log("+++++++++++++++");
        })
    };
    //await pic();
};
