const Category = require('../schema/category');
const uuid = require('uuid');
const mongoose = require('mongoose');
class CategoryModel {
    /**
     * 查询所有
     * @returns {Promise<*>}
     */
    static async getAll(params){
        try {
            let sql = params._id?{'_id':params._id}:{};
            let data={};
            data.total = await Category.find(sql).count();
            data.data = await Category.find(sql);
            return data;
        }catch (e) {
            console.log(e);
        }
    }
    /**
     * 增加分类
     * @param params
     * @returns {Promise<*>}
     */
    static async add(params){
        try {
            const category = new Category(params);
            return await category.save();
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 增加栏目
     * @param params
     * @returns {Promise<*>}
     */
    static async addColumn(params){
        console.log(params);
        try {
            return await Category.update({_id:params.category_id},{$push:{'column':{
                        name:params.name,
                        url:params.url
                    }}})
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 删除
     * @param params
     * @returns {Promise<*>}
     */
    static async delete(params){
        try {
            return await Category.remove({"_id":params._id})
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 增加subclass子类
     * @param params
     * @returns {Promise<*>}
     */
    //三级取消  通配符做记录
    /*static async addClass(params){
        try {
            return await Category.update({'column.column_id':params.column_id},{$push:{'column.$.subclass':{
                        name:params.name,
                        url:params.url
                    }}})
        }catch (e) {
            console.log(e);
        }
    }*/
}
module.exports = CategoryModel;
