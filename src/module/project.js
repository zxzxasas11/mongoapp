const Project = require('../schema/project');
const mongoose = require('mongoose');
class ProjectModel {
    /**
     * 添加项目
     * @param params
     * @returns {Promise<*>}
     */
    static async add(params){
        try {
            let data =await Project.findOne().sort({create_time:-1});
            if(data){
                console.log("之前已经有数据了");
                params.code = parseInt(data.code) +1;
            }
            else params.code =10000;
            return await Project.create(params);
        }catch (e) {
            console.log(e);
        }
    }


    /**
     * 根据用户查询能见的项目
     * @param userId
     * @returns {Promise<*>}
     */
    static async getById(userId){
        return Project.find({"$or":[{creator:userId},{member:{$in:[userId]}}]}).sort({create_time:-1});
    }

    /**
     * 根据id获取单条
     * @param id
     * @returns {Promise<Query>}
     */
    static async getOne(id){
        return Project.findById(id)
    }

    /**
     * 添加目录
     * @param params
     * @returns {Promise<*>}
     */
    static async addCategory(params){
        return Project.updateOne(
            {"$or":[{_id:params.id},{'category_id':params.id}]},
            {$push:{
                'category': params.category
            }}
        )
    }
}
module.exports = ProjectModel;
