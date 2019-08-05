const CreateFs = require('../util/upload');
const cheerio = require('cheerio');
const superagent = require('superagent');
class SpiderController{
    /**
     * 爬虫获取
     * @param ctx
     * @returns {Promise<void>}
     */
    static async spider(ctx){
        let url = ctx.request.body.url;
        superagent.get(url)
            .end((err, sres) => { //页面获取到的数据
                let html = sres.text;
                console.log(html);
                let $ = cheerio.load(html, {
                    decodeEntities: false
                });
                $(".c2").each((index,element)=>{
                    console.log($(element).text());
                    //console.log($(element).attr("href"));
                })
                  /*  $ = cheerio.load(html, {
                        decodeEntities: false
                    }), //用cheerio解析页面数据
                    obj = {};
                arr = [];*/

              /*  //下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
                $(".hotnews ul li").each((index, element) => {
                    var $text = $(element).text();
                    arr.push($text);
                });*/

            });
    }
}
module.exports = SpiderController;


