const qs= require('qs');
/**
 *
 */
module.exports = function () {
    return async function (ctx, next) {
        if(ctx.user){
        }
        await next();

    }
};
