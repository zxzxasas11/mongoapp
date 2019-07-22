const CreateFs = require('../util/upload');
class UploadController{
    static async upload(ctx){
        let url = await CreateFs(ctx.request.files.file);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功",
            data:url
        };
    }
}
module.exports = UploadController;


