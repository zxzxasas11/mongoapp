let request = require('request');
let fs = require('fs');
const spiderModel = require('../module/spider');
async function download(json,jsonIndex,jsonData) {
    if(json!==undefined){
        let index=json.url.lastIndexOf("/");
        let fileName = json.url.substring(index+1);
        let Atitle = dele(json.title);
        let p = `F:/spider/${Atitle}/`;
        try {
            if (!fs.existsSync(p)) {
                fs.mkdirSync(p);
            }
        }catch (e) {
            console.log(e);
        }
        console.log("正在执行"+json.title);
        request(json.url).on('end',async function() {
            console.log('文件下载成功');
            await spiderModel.setStatus(json._id);
            await download(jsonData[jsonIndex+1],jsonIndex+1,jsonData);
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
        await download(data[0],0,data);
    }
    this.fun();

};
