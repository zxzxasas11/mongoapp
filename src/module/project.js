const Project = require('../schema/project');
const pageQuery = require('../util/pageQuery');
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
        return Project.findById(id)//.populate({path:'category._id',select:"name"})                //.populate({path: 'creator', select: 'username'})
    }

    /**
     * 添加目录
     * @param params
     * @returns {Promise<*>}
     */
    static async addCategory(params){
        return Project.updateOne(
            {_id:params.id},
            {$push:{
                'category': params.category
            }}
        )
    }

    /**
     * 分页查询
     * @param params
     * @returns {Promise<void>}
     */
    static async getAll(params){
        //return await Project.find(params)
        return await pageQuery(Project,params,"",{"update_time":-1});
    }

    /**
     * 申请加入
     * @param params
     * @returns {Promise<void>}
     */
    static async applyProject(params){
        console.log({proposerId:params.userId});
        return await Project.updateOne({_id:params.id},{
                $push:{applyList:{proposerId:params.userId}
            }
        })
    }


    /**
     * 添加api
     * @param projectId
     * @param params
     * @returns {Promise<void>}
     */
    static async addApi(projectId,params){
        try {
            return await Project.updateOne({_id:projectId},{
                $push:{api:params}
            })
        }catch (e) {
            console.log(e);
        }
    }
}
module.exports = ProjectModel;
