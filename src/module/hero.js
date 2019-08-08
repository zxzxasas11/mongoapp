const Hero = require('../schema/hero');
const moment = require('moment');
class HeroModel {
    static async add(params){
        console.log(params);
        const hero = new Hero(params);
        await hero.save();
    }
}
module.exports = HeroModel;
