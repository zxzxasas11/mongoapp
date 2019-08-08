const Material = require('../schema/material');
const moment = require('moment');
class MaterialModel {
    /**
     * 添加材料
     * @param params
     * @returns {Promise<void>}
     */
    static async add(params){
        console.log(params);
        const material = new Material(params);
        try {
            await material.save();
        }catch (e) {
            console.log(e);
        }

    }
}
module.exports = MaterialModel;
