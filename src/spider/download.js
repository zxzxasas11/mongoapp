let request = require('request');
let fs = require('fs');
const spiderModel = require('../module/spider');
async function download(json,jsonIndex,jsonData) {
    if(json!==undefined){
        let index=json.url.lastIndexOf("/");
        let fileName = json.url.substring(index+1);
        let Atitle = dele(json.title);
        let p = `F:/cos/${Atitle}/`;
        try {
            if (!fs.existsSync(p)) {
                fs.mkdirSync(p);
            }
        }catch (e) {
            console.log(e);
        }
        request(json.url).on('end',async function() {
            console.log('文件下载成功:'+json.title);
            await spiderModel.setStatus(json._id,1);
            if(jsonIndex<=48) {
                await download(jsonData[jsonIndex+1],jsonIndex+1,jsonData);
            }
            else await fun();
        }).on('error',async function(err){
            console.log("文件下载失败");
            console.log(err);
            if(err.code==='ETIMEDOUT'){
                console.log("下载该图片超时");
                await spiderModel.setStatus(json._id,408);
                if(jsonIndex<=48) {
                    await download(jsonData[jsonIndex + 1], jsonIndex + 1, jsonData);
                }
                else await fun();
            }
            else if(err.code==='ECONNRESET'){
                console.log("下载报错");
                await spiderModel.setStatus(json._id,500);
                if(jsonIndex<=48){
                    await download(jsonData[jsonIndex+1],jsonIndex+1,jsonData);
                }
                else await fun();
                }
            else{
                await download(jsonData[jsonIndex],jsonIndex,jsonData);
            }

        }).pipe(fs.createWriteStream(p+ fileName));
    }
    else{
        console.log("本次下载完成,共计下载"+jsonIndex+"张图片");
        await fun();
    }

}

function dele(str) {
    return str.replace(/[\'\"\\\\\/\/|/|/*//?//"///'/:/b\f\n\r\t]/g, '');
}
module.exports = async function() {
    this.fun =async function(){
        let data = await spiderModel.getDownloadList();
        if(data.length>0){
            await download(data[0],0,data);
        }
        else console.log("已经全部下载完成");
    };
    await this.fun();

};
