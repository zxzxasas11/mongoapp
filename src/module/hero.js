const Hero = require('../schema/hero');
const moment = require('moment');
const pageQuery = require('../util/pageQuery');
class HeroModel {
    /**
     * 添加英灵
     * @param params
     * @returns {Promise<void>}
     */
    static async add(params){
        console.log(params);
        const hero = new Hero(params);
        await hero.save();
    }


    /**
     * 查询
     * @param params
     * @returns {Promise<*>}
     */
    static async getAll(params){
        let arr = ["name"];
        return await pageQuery(Hero,params,"name type star pic",{"create_time":-1},arr);
    }

    /**
     * 根据id查询单条
     * @param id
     * @returns {Promise<void>}
     */
    static async getOne(id){
        return Hero.findOne({_id:id});
    }
}
module.exports = HeroModel;
