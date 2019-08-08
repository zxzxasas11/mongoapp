const Material = require('../schema/material');
const moment = require('moment');
class MaterialModel {
    /**
     * 添加材料
     * @param params
     * @returns {Promise<void>}
     */
    static async add(params){
        const material = new Material(params);
        try {
            await material.save();
            console.log("插入完成");
        }catch (e) {
            console.log(e);
        }

    }


    static async batchAdd(params){
        try {
            await Material.insertMany(params);
        }catch (e) {
            console.log(e);
        }
    }
}
module.exports = MaterialModel;
