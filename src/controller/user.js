require("../model/user");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
class CarController{
    /**
     * 注册
     * @param ctx
     * @param next
     * @returns {Promise<*>}
     */
    static async add(ctx, next) {
        let params=ctx.request.body;
        //对密码进行加密
        const salt =bcrypt.genSaltSync();
        params.password = bcrypt.hashSync(params.password,salt);
        let user = new User(params);
        let userInfo = await User.find({code:params.code});
        if(userInfo.length >0){
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "该账号已存在",
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
            const userToken ={code:userDetail.code,userId:userDetail.userId,username:userDetail.username,power:userDetail.power};
            const token =jwt.sign(userToken,secret.sign,{expiresIn:"1h"});
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
}
module.exports = CarController;


