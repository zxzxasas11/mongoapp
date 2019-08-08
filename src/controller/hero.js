const HeroModel =require('../module/hero');
class HeroController{
    static async add(ctx){
        console.log(ctx.request.body);
        let data = await HeroModel.add(ctx.request.body);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "添加成功",
            data:data
        };
    }

}
module.exports = HeroController;


