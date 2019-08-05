const RabbitMq = require('../util/Rabbitmq');
const qs= require('qs');
/**
 *
 */
module.exports = function () {
    return async function (ctx, next) {
        //console.log("---------");
        //let mq = new RabbitMq();
        //console.log(ctx.request.body);
        /*switch (ctx.request.method) {
            case "POST":
                mq.sendQueueMsg(ctx.request.url,qs.stringify(ctx.request.body));
                break;
            case "GET":
                mq.sendQueueMsg(ctx.request.url,qs.stringify(ctx.request.query));
                break;
        }*/
        //console.log("---------");
        await next();
        /*if(adminPath.includes(ctx.request.url.split("?")[0])){
            if(ctx.user.power>1){
                await next();
            }
            else{
                ctx.response.status = 600;
                ctx.body = {
                    code: 600,
                    msg: "你没有该权限"
                };
            }
        }
        else await next();*/

    }
};
