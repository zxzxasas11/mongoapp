const ProjectModel =require('../module/project');
class ProjectController{
    /**
     * 添加收藏
     * @param ctx
     * @returns {Promise<void>}
     */
    static async add(ctx){
        let params = ctx.request.body;
        params.creator = ctx.user.userId;
        let data = await ProjectModel.add(params);
        console.log(data);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功",
        };
    }

    /**
     * 用户查询可见项目列表
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getById(ctx){
        let id = ctx.user.userId;
        console.log(id);
        let data = await ProjectModel.getById(id);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询结果",
            data:data
        };
    }

    /**
     * 根据id获取单条
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getOne(ctx){
        let id = ctx.params.id;
        let data = await ProjectModel.getOne(id);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询结果",
            data:data
        };
    }


    /**
     * 添加目录
     * @param ctx
     * @returns {Promise<void>}
     */
    static async addCategory(ctx){
        const params = ctx.request.body;
        console.log(params);
        await ProjectModel.addCategory(params);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功"
        };
    }

}
module.exports = ProjectController;


