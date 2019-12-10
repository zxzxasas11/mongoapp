const EquipmentModel =require('../module/equipment');
class EquipmentController{
    /**
     * 添加礼装
     * @param ctx
     * @returns {Promise<void>}
     */
    static async add(ctx){
        console.log(ctx.request.body);
        let data = await EquipmentModel.add(ctx.request.body);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功",
            data:data
        };
    }

    /**
     * 获取列表
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getAll(ctx){
        const params = ctx.request.query;
        let data = await EquipmentModel.getAll(params);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询成功",
            data:data
        };
    }

    /**
     * 根据Id获取单条
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getOne(ctx){
        const id = ctx.params._id;
        let data = await EquipmentModel.getById(id);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询成功",
            data:data
        };
    }
}
module.exports = EquipmentController;
