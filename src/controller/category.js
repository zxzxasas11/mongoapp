const CategoryModel =require('../module/category');
const RabbitMQ = require('../util/Rabbitmq');
class CategoryController{
    /**
     * 获取所有
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getAll(ctx) {
        console.log(ctx.request.path);
        try {
            let aa = await CategoryModel.getAll(ctx.request.query);
            /*let mq = new RabbitMQ();
            mq.sendQueueMsg(ctx.request.path, await CategoryModel.getAll(ctx.request.query), (error) => {
                console.log(error)
            });*/
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "查询结果",
                data:aa
            };
        }
        catch (e) {
            console.log(e);
        }
    }


    static async del(ctx){
        //let aa = await CategoryModel.getAll(ctx.request.query);
        try {
            await CategoryModel.del(ctx.request.params);
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 增加类别
     * @param ctx
     * @returns {Promise<void>}
     */
    static async addCategory(ctx){
        let params = ctx.request.body;
        let aa = await CategoryModel.add(params);
        if(aa._id){
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "添加成功",
            };
        }
        else{
            ctx.response.status = 400;
            ctx.body = {
                code: 400,
                msg: "服务器出错",
            };
        }
    }

    /**
     * 增加栏目
     * @param ctx
     * @returns {Promise<void>}
     */
    static async addColumn(ctx){
        let params =ctx.request.body;
        let data = await CategoryModel.addColumn(params);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功",
            data:data
        };
    }

    static async delete(ctx){
        let params = ctx.request.body;
        let data = await CategoryModel.delete(params);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "删除成功",
        };
    }
}
module.exports = CategoryController;


