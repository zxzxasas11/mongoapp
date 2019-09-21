const HeroModel =require('../module/hero');
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
}
module.exports = HeroController;
