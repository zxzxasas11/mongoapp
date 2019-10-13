const cheerio = require('cheerio');
const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const spiderModel = require('../module/spider');
const spidererrModel = require('../module/spidererr');
let request = require('request');
let fs = require('fs');


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
                        let size =0;
                        let a = parseInt($(".pagenavi a").eq(-1).attr("href").split(url)[1].replace("/",""));
                        $(".cate1.auth1").each(async (index,element)=>{
                            //console.log($(element).children("div").children("a").attr("href"));
                            //if(index===0){
                                await getImg($(element).children("div").children("a").attr("href"))
                            //}

                            size++;
                        });

                        resolve({url:url,index:index,page:a,size:size});
                    }
                });
        }

    }).then(async function (r) {
        console.log("这一页已经结束,共有"+r.size+"页");
        if(r.index+1 <=r.page){
            await getList(url,r.index+1);
        }
        return r;
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
                        //console.log(html);
                        console.log(url);
                        let size = 0;
                        //console.log($("#portfolio").html());
                        $("#portfolio ul li img").each(async (index,element)=>{
                            console.log($(element).attr("src"));
                            //console.log(index)
                            size++;
                            //console.log($(element).children("img").attr("src"))
                        })
                        resolve(size);
                        //resolve({url:url,index:index,page:a,size:size});
                    }
                });
        }

    }).then(async function (r) {
        console.log("这一页已经结束,共有"+r+"张图片");
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
                    //console.log(html);
                    let arr=[];
                    $(".inner.menu").children("ul").children("li").each((index,element)=>{
                        //console.log(index)
                        //console.log($(element).children("a").attr("href"))
                        if(index>=1){
                            arr.push($(element).children("a").attr("href"))
                        }

                    });
                        //await getPic($(element).children("a").attr("href"));
                    resolve(arr)

                    //await fun(index+1);
                }
            });
    }}).then(function (r) {
        //console.log(r);
        return r;
    })

}

module.exports = async function () {
    this.pic = async ()=>{
        await getInfo("http://5199168.com").then(async res=>{
            await getList(res[0],1);
        })
    };
    await pic();
    //await getInfo("https://www.mzitu.com",1);
};
