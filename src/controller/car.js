require("../model/car");
const mongoose = require('mongoose');
const Car = mongoose.model('Car');
const uuid = require('uuid');
class CarController{
    /**
     * 新增
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    static async add(ctx, next) {
        let { name } = ctx.request.body;
        let car = new Car({ car_id: uuid.v1().replace(/-/g,""), car_name: name });
        let res = await car.save();
        if (res._id != null) {
            ctx.body = {
                code: 200,
                msg: "add success"
            }
        }
    }

    static async find(ctx, next) {
        try {
            let carInfo = await Car.find({}, null)
            ctx.body = {
                code: 200,
                msg: "获取信息成功",
                list: carInfo
            }
        } catch (e) {
            console.log(e);
            ctx.body = {
                code: 500,
                msg: "获取信息，服务器异常，请稍后再试！"
            }
        }
    }

    static async delcar(ctx, next) {
        let id = ctx.params.id;
        console.log(id)
        try {
            let res = await Car.findOneAndDelete({ car_id: id })
            if (res == null) {
                ctx.body = {
                    code: 500,
                    msg: "Delete fail"
                }
            } else {
                ctx.body = {
                    code: 200,
                    msg: "Delete Success"
                }
            }
        } catch (e) {
            console.log(e);
            ctx.body = {
                code: 500,
                msg: '删除失败，服务器异常!'
            }
        }
    }
}
module.exports = CarController;


