const MaterialModel =require('../module/material');
class MaterialController{
    /**
     * 添加材料
     * @param ctx
     * @returns {Promise<void>}
     */
    static async add(ctx){
        await MaterialModel.add(ctx.request.body);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功",
        };
    }
}
module.exports = MaterialController;


