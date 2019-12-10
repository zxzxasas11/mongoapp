const MaterialModel =require('../module/material');
const getImg = require('../util/getMaterial');
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

    static async test(){
        await getImg();
    }

    static async import(ctx){
        const RabbitMQ = require('../util/Rabbitmq');
        let mq = new RabbitMQ();
        mq.receiveQueueMsg("material",async (msg)=>{
            await MaterialModel.add(JSON.parse(msg));
            console.log("消化了一条队列");
        });
    }


    /**
     * 根据id获取单条
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getOne(ctx){
        let data = await MaterialModel.getOne(ctx.params);
        console.log(data);
    }


    /**
     * 查询
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getAll(ctx){
        console.log(ctx.request.query)
        let data = await MaterialModel.getAll(ctx.request.query);
        if(data){
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "查询成功",
                data:data
            };
        }

    }

}
module.exports = MaterialController;


