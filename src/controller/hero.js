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
        let data = await HeroModel.getAll(ctx.request.query);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询成功",
            data:data
        };
    }

    /**
     * 获取单个英灵
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getOne(ctx){
        let id = ctx.params.heroId;
        try {
            let data = await HeroModel.getOne(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "success",
                data:data
            };
        }catch (e) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: "server error",
            };
        }

    }

    static async getExp(ctx){
        let startLevel = parseInt(ctx.request.query.startLevel)||1,endLevel = parseInt(ctx.request.query.endLevel);
        let nextExp = 50*startLevel*(startLevel+1),totalExp = ((endLevel*endLevel*endLevel-endLevel)*50/3-(startLevel*startLevel*startLevel-startLevel)*50/3);
        let expCard = 32400;
        let data ={
            nextLevel:Math.round(nextExp/expCard),
            total:Math.round(totalExp/expCard)
        };
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "success",
            data:data
        };

    }
}
module.exports = HeroController;
