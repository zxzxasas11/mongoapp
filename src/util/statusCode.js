const arr = [
    {code: 600, msg: "您没有该权限"},
    {code: 601, msg: "信息已存在"},
    {code: 602, msg: "该贴已经锁定,不允许回复"},
];

module.exports = async (ctx,code, data) => {
    let msg;
    arr.forEach((element, index, arr1) => {
        if (element.code === code) {
            msg = element.msg;
        }
    });
    if(data){
        ctx.response.status = code;
        ctx.body = {
            code: code,
            msg: msg,
        };
    }
    else{
        ctx.response.status = code;
        ctx.body = {
            code: code,
            msg: msg,
            data:data
        };
    }
};
