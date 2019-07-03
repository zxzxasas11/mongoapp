const CategoryModel =require('../module/category');
const CreateFs = require('../util/upload');
class CategoryController{
    static async getAll(ctx) {
        try {
            let aa = await CategoryModel.getAll();
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


    /**
     * 增加类别
     * @param ctx
     * @returns {Promise<void>}
     */
    static async addCategory(ctx){
        let params = ctx.request.body;
        console.log(params);
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

    static async addClass(ctx){
        let {column_id,class_name,class_url} = ctx.request.body;
        let params = {column_id,class_name,class_url};
        let data = await CategoryModel.addClass(params);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功",
            data:data
        };
    }
}
module.exports = CategoryController;


