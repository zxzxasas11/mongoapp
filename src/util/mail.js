"use strict";
const nodemailer = require("nodemailer");
/**
 * 上传文件保存到服务器
 */
let transporter =nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '3214667102@qq.com',
        pass: 'xualnvqasxjcdfcb' //授权码,通过QQ获取
    }
});
module.exports = function sendMail(mail) {

    /*let mailOptions = {
        from: '361161534@qq.com', // 发送者
        to: '3214667102@qq.com', // 接受者,可以同时发送多个,以逗号隔开
        subject: 'nodemailer2.5.0邮件发送', // 标题
        //text: 'Hello world', // 文本
        html: `<h2>nodemailer基本使用:</h2><h3>
              <a href="https://www.cnblogs.com/zero-zm/p/10514643.html">
              https://www.cnblogs.com/zero-zm/p/10514643.html</a></h3>`
    };*/
    return new Promise(() => {
        transporter.sendMail(mail, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('发送成功');
            info.send('发送成功');  //res.send()后面的语句不会执行，若想要执行语句，放在res.send()语句前面；
        });
    })

};
