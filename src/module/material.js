const Material = require('../schema/material');
const moment = require('moment');
const page = require('../util/page');
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

    /**
     * 根据名称
     * @param params
     * @returns {Promise<*>}
     */
    static async getAll(params){
        try {
            let data={};
            data.count = await Material.countDocuments();
            data.data = await page(Material.find({name:new RegExp(params.name)}),params);
            return data;
        }catch (e) {
            console.log(e);
        }
    }


    /**
     * 根据id获取单条
     * @param params
     * @returns {Promise<void>}
     */
    static async getOne(params){
        try {
            return await Material.findOne(params);
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 批量添加
     * @param params
     * @returns {Promise<void>}
     */
    static async batchAdd(params){
        try {
            await Material.insertMany(params);
        }catch (e) {
            console.log(e);
        }
    }
}
module.exports = MaterialModel;
