const log4js = require('log4js')
const {formatError, formatRes} = require('./formatLog')
let logger = {}
let errorLogger = log4js.getLogger('error')
let resLogger = log4js.getLogger('response')
const LogModel =require('../module/log');
logger.errLogger = async (ctx, error, resTime) => {
    if(ctx && error) {
        await LogModel.create('ErrorRequest', 'error', formatError(ctx, error, resTime))
        errorLogger.error(formatError(ctx, error, resTime))
    }
}
// 封装相应日志
logger.resLogger = async (ctx, resTime) => {
    if(ctx) {
        await LogModel.create('RequestInfo', 'info', formatRes(ctx, resTime))
        resLogger.info(formatRes(ctx, resTime))
    }
}
module.exports =logger;
