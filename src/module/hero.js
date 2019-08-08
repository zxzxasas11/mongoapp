const Hero = require('../schema/hero');
const moment = require('moment');
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
        console.log(params);
        let data = await Hero.find(params,"name type star pic");
        return data;
    }
}
module.exports = HeroModel;
