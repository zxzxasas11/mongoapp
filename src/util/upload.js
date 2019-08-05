"use strict";
//上传文件中间件
const path = require('path');
const fs =require('fs');
const config = require('../config/config');
const moment = require("moment");
const uuid = require('uuid');
/**
 * 上传文件保存到服务器
 */
module.exports = async function CreateFs(file) {
    const ext ='.'+file.type.split('/')[1];
    //const name = file.name.split('.')[0];
    //const imgName = `${name}_${new Date().getTime().toString()}${ext}`;
    const filename = uuid.v1().replace(/-/g,"")+`${ext}`;
    let data = moment(new Date()).format('YYYYMMDD');
    let p = `${config.uploadPath}/${data}`;
    try {
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }catch (e) {
        console.log(e);
    }
    const newpath =path.join(p+'/'+filename);
    const reader = await fs.createReadStream(file.path); //创建可读流
    const stream = await fs.createWriteStream(newpath); //创建一个可写流
    await reader.pipe(stream);
    return `/${data}/${filename}`;
}
