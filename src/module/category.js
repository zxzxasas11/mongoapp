const Category = require('../schema/category');
const uuid = require('uuid');
class CategoryModel {
    /**
     * 查询所有
     * @returns {Promise<*>}
     */
    static async getAll(){
        try {
            let data={};
            data.total = await Category.find().count();
            data.data = await Category.find();
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
        try {
            return await Category.update({category_id:params.category_id},{$push:{'column':{
                        column_name:params.column_name,
                        column_url:params.column_url
                    }}})
        }catch (e) {
            console.log(e);
        }
    }

    /**
     * 增加subclass子类
     * @param params
     * @returns {Promise<*>}
     */
    static async addClass(params){
        try {
            return await Category.update({'column.column_id':params.column_id},{$push:{'column.$.subclass':{
                        class_name:params.class_name,
                        class_url:params.class_url
                    }}})
        }catch (e) {
            console.log(e);
        }
    }
}
module.exports = CategoryModel;
