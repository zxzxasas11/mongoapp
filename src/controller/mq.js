const RabbitMQ = require('../util/Rabbitmq');
class MqController{
    /**
     * 发送mq
     * @param ctx
     * @returns {Promise<void>}
     */
    static async send(ctx){
        let mq = new RabbitMQ(),params = ctx.request.body;
        mq.sendQueueMsg(params.name, params.message, (error) => {
            console.log(error);
        });
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "发送成功",
        };
    }

    /**
     * 接收mq
     * @param ctx
     * @returns {Promise<void>}
     */
    static async receive(ctx){
        let mq = new RabbitMQ(),params=ctx.request.body;
        await mq.receiveQueueMsg(params.name,(msg) => {
            console.log(msg);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "取出成功",
                data:msg
            };
        });

    }

}
module.exports = MqController;


