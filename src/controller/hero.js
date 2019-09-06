const HeroModel =require('../module/hero');
const getHero = require('../util/getHero');
const getPic = require("../util/getPic");
//const downloadPic = require("../util/downloadPic");
class HeroController{
    /**
     * 添加英灵
     * @param ctx
     * @returns {Promise<void>}
     */
    static async add(ctx){
        console.log(ctx.request.body);
        let data = await HeroModel.add(ctx.request.body);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功",
            data:data
        };
    }

    /**
     * 查询
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getAll(ctx){
        let data = await HeroModel.getAll(ctx.request.body);
        ctx.body = {
            code: 200,
            msg: "查询成功",
            data:data
        };
    }

    static async spider(ctx){
        await getPic();
    }

    static async downloadPic(){
        await downloadPic();
    }

}
module.exports = HeroController;
