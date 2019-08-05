const mongoose = require('mongoose');
const User = require('../schema/user');
const UserModel = require('../module/user');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const mail =require('../util/mail');
const randomCode = require('../util/randomCode');
//const redis = require('../util/redis');
class CarController{
    /**
     * 注册
     * @param ctx
     * @returns {Promise<*>}
     */
    static async add(ctx) {
        let params=ctx.request.body;
        console.log(params);
        let flag=true;
        /*await redis.get(params.email).then(res=>{
            if(res!==params.authCode){
                flag=false;
                ctx.response.status = 602;
                ctx.body = {
                    code: 602,
                    msg: "验证码填写错误",
                };
            }
        });
        if(!flag){
            return false;
        }*/
        //对密码进行加密
        const salt =bcrypt.genSaltSync();
        params.password = bcrypt.hashSync(params.password,salt);
        let user = new User(params);
        //let userInfo = await User.find({code:params.code,email:params.email});
        let userInfo = await User.find({$or:[{code:params.code},{email:params.email}]});
        if(userInfo.length >0){
            ctx.response.status = 601;
            ctx.body = {
                code: 601,
                msg: "账号名或邮箱已存在",
            };
            return false;
        }
        else{
            await user.save();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "新增成功",
            }
        }
    }

    /**
     * 登录
     * @param ctx
     * @returns {Promise<*>}
     */
    static async login(ctx){
        let params = ctx.request.body;
        let userDetail = await User.findOne({code:params.code});
        if(userDetail.length===0){
            ctx.response.status = 403;
            ctx.body = {
                code: 403,
                message: "用户不存在"
            };
            return false;
        }
        //密码匹配
        if (bcrypt.compareSync(params.password, userDetail.password)){
            const userToken ={code:userDetail.code,userId:userDetail._id,username:userDetail.username,power:userDetail.power};
            const token =jwt.sign(userToken,secret.sign,{expiresIn:"10h"});
            //await mail();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "登录成功",
                data: {
                    token: token
                }
            };
        }
        else {
            ctx.response.status = 401;
            ctx.body = {
                code: 401,
                message: "用户名或密码错误"
            }
        }
    }

    /**
     * 查询所有用户
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getAll(ctx){
        try {
            let data = await UserModel.getAll(ctx.request.body);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "查询结果",
                data:data
            };
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 根据用户id查询
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getByUser(ctx){
        let userId = ctx.request.query.userId||ctx.user.userId;
        console.log(userId);
        let data = await UserModel.getByUser(userId);
        if(data._id){
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "查询结果",
                data:data
            };
        }
    }

    /**
     * 发送验证码
     * @param ctx
     * @returns {Promise<void>}
     */
    static async sendCode(ctx){
        /*redis.get(ctx.request.body.email).then(res=>{
            if(res!==null){

            }
            console.log(res);
        });*/
        const authCode  =randomCode(6);
        const mailInfo ={
            from: '3214667102@qq.com', // 发送者
            to: `${ctx.request.body.email}`, // 接受者,可以同时发送多个,以逗号隔开
            subject: '注册用户验证码', // 标题
            text: `验证码为${authCode}`, // 文本
            /*html: `<h2>nodemailer基本使用:</h2><h3>
              <a href="https://www.cnblogs.com/zero-zm/p/10514643.html">
              https://www.cnblogs.com/zero-zm/p/10514643.html</a></h3>`*/
        };
        await mail(mailInfo);
        //redis.set(ctx.request.body.email,authCode);
        //redis.expire(ctx.request.body.email,1800);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            message: `验证码为${authCode}`,
        };

    }
}
module.exports = CarController;


