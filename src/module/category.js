const Category = require('../schema/category');
const uuid = require('uuid');
class CategoryModel {

    static async getAll(){
        try {
            return await Category.find();
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
                        //column_id:uuid.v1().replace(/-/g,""),
                        column_name:params.column_name,
                        column_url:params.column_url
                    }}})
        }catch (e) {
            console.log(e);
        }
    }
}
module.exports = CategoryModel;
