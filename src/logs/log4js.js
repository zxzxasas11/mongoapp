const log4js = require('log4js')
const {formatError, formatRes} = require('./formatLog')
let logger = {}
let errorLogger = log4js.getLogger('error')
let resLogger = log4js.getLogger('response')
const LogModel =require('../module/log');
logger.errLogger = async (ctx, error, resTime) => {
    if(ctx && error) {
        let ip =ctx.req.headers['x-forwarded-for'] ||
            ctx.req.connection.remoteAddress ||
            ctx.req.socket.remoteAddress ||
            ctx.req.connection.socket.remoteAddress;
        let log = {
            method: formatRes(ctx, resTime).method,
            url: formatRes(ctx, resTime).url,
            costTime: formatRes(ctx, resTime).costTime,
            requestTime:Date.now(),
            status: formatRes(ctx, resTime).response.status,
            body:formatRes(ctx, resTime).body,
            username:global.user.username,
            host:ip.substring(7),
            description:global.log.desc
        };
        await LogModel.create(log);
        errorLogger.error(formatError(ctx, error, resTime))
    }
}
// 封装相应日志

logger.resLogger = async (ctx, resTime) => {
    let ip =ctx.req.headers['x-forwarded-for'] ||
        ctx.req.connection.remoteAddress ||
        ctx.req.socket.remoteAddress ||
        ctx.req.connection.socket.remoteAddress;
    if(ctx) {
            if(global.log.desc){
                let log = {
                    method: formatRes(ctx, resTime).method,
                    url: formatRes(ctx, resTime).url,
                    costTime: formatRes(ctx, resTime).costTime,
                    requestTime:Date.now(),
                    status: formatRes(ctx, resTime).response.status,
                    body:formatRes(ctx, resTime).body,
                    username:global.user.username,
                    host:ip.substring(7),
                    description:global.log.desc
                };
                await LogModel.create(log);
                resLogger.info(formatRes(ctx, resTime));
            }
    }
}
module.exports =logger;
