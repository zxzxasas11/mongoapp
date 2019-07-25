const adminPath = require("./adminPath");
/**
 *
 */
module.exports = function () {
    return async function (ctx, next) {
        console.log(adminPath);
        console.log("-------------------");
        console.log(ctx.request.url.split("?")[0]);
        if(adminPath.includes(ctx.request.url.split("?")[0])){
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
        else await next();

    }
};
