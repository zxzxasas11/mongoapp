const cheerio = require('cheerio');
const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const spiderModel = require('../module/spider');
const spidererrModel = require('../module/spidererr');
//获取每一页的分类
async function getInfo(url,index) {
    if (url !== undefined && url) {
        superagent.get(url).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    $("#pins li").each(async (index,element)=>{
                        await getPic($(element).children("a").attr("href"));
                    });
                    await fun(index+1);
                }
            });
    }

}

//点击每一页详情
async function getPic(url){
    if (url !== undefined && url) {
        superagent.get(url).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    const a = $(".pagenavi a").eq(-2).children("span").text();
                    const b =$(".main-title").text();
                    if(b){
                        for(let i =1;i<=a;i++){
                            if(i===1){
                                await getImg(url,b)
                            }
                            else{
                                await getImg(`${url}/${i}`,b)
                            }
                        }
                    }
                    else{
                        let params = {title:b,url:url,remark:"未获取页码"}
                        await spidererrModel.add(params);
                    }

                    //console.log(b)
                }
            });
    }
}

async function getImg(url,title,id){
    if (url !== undefined && url) {
        superagent.get(url).charset("utf-8").buffer(true)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    let imgUrl = $(".main-image").find("img").attr("src");
                    console.log(title);
                    console.log(imgUrl);
                    if(title!==undefined&&imgUrl!==undefined){
                        await download(imgUrl,title,id);
                    }
                    else{
                        await spidererrModel.edit(id,4);
                        await pic();
                    }

                    return;
                    if(imgUrl!==undefined){
                        await download(imgUrl,title)
                    }
                    else{
                        let info ={title:title,url:url,remark:"未读取到图片路径"}
                        await spidererrModel.add(info);
                    }
                    //console.log(imgUrl);
                    //await download(imgUrl,title)
                }
            });
    }
}

async function download(url, title,id) {
    let json = {url: url, title: title};
    if(json.title!==undefined&&json.url!==undefined){
        let data = await spiderModel.add(json);
        if(data._id){
            await spidererrModel.edit(id,1);
            await pic();
        }
        else{
            await pic();
        }
    }

    //console.log(data);
}



module.exports = async function () {
    let url='https://www.mzitu.com/page/';
    this.fun =async (index)=>{
        if(index<=332){
            console.log(`现在开始执行第${index}页`);
            if(index===1){
                await getInfo("https://www.mzitu.com",1)
            }
            else{
                await getInfo(url+index+"/",index);
            }

        }
        else{
            console.log(`已经结束`);
        }

    };
    //await this.fun(1);
    this.pic = async ()=>{
        let data = await spidererrModel.getOne();
        await getImg(data.url,data.title,data._id);
    };
    await pic();
};
