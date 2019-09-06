let request = require('request')
let fs = require('fs')
const spiderModel = require('../module/spider');
function download(json,jsonIndex,jsonData) {
    console.log("正在执行"+json.title);
    if(json.title!==undefined){
        let index=json.url.lastIndexOf("/");
        let fileName = json.url.substring(index+1);
        let Atitle = dele(json.title);
        //Atitle = Atitle.replace(/\s*/g,"");
        let p = `c:/zxc/${Atitle}/`;
        try {
            if (!fs.existsSync(p)) {
                fs.mkdirSync(p);
            }
        }catch (e) {
            console.log(e);
        }
        //let filename = '2.jpg';
        request(json.url).on('end',async function() {
            console.log('文件下载成功');
            await spiderModel.setStatus(json._id);
            await download(jsonData[jsonIndex+1],jsonIndex+1,jsonData);
        }).pipe(fs.createWriteStream(p+ fileName));
    }

}

function dele(str) {
    return str.replace(/[\'\"\\\\\/\/|/|/*//?//"///'/:/b\f\n\r\t]/g, '');
}

module.exports = async function () {
    let data = await spiderModel.getDownloadList();
    /*for(let i in data){
        console.log("正在执行"+data[i]._id);
        await download(data[i]);
    }*/
    await download(data[0],0,data)
};