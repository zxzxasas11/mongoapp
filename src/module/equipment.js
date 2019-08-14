const Equipment = require('../schema/equipment');
const moment = require('moment');
const pageQuery = require('../util/pageQuery');
class EquipmentModel {
    /**
     * 添加礼装
     * @param params
     * @returns {Promise<void>}
     */
    static async add(params){
        const equipment = new Equipment(params);
        await equipment.save();
    }

    /**
     * 获取列表
     * @param params
     * @returns {Promise<void>}
     */
    static async getAll(params){
        try {
            let arr = ["name"];
            return await pageQuery(Equipment,params,"name code portrait star skill effect",{"code":-1},arr);
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 根据id查询单条
     * @param id
     * @returns {Promise<void>}
     */
    static async getById(id){
        try {
            return await Equipment.findById(id);
        }catch (e) {
            console.log(e);
        }
    }


}
module.exports = EquipmentModel;
