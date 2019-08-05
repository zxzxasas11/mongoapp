const RoleModel =require('../module/role');
class RoleController{
    /**
     * 增加role
     * @param ctx
     * @returns {Promise<void>}
     */
    static async add(ctx){
        let data = await RoleModel.add(ctx.request.body);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "发送成功"
        };
    }

}
module.exports = RoleController;


