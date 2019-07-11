const User = require('../schema/user');
const mongoose = require('mongoose');
class UserModel {
    static async getAll(params){
        //let pageSize  = parseInt(params.pageSize)||10;
        //let currentPage = parseInt(params.currentPage)||1;
        let sql = params.id?{'_id':params.id}:{};
        return await User.find(sql,"code create_time username sex email phone power coin")
            .sort({'create_time':-1});
    }

    /**
     * 根据用户id查询
     * @param userId
     * @returns {Promise<void>}
     */
    static async getByUser(userId) {
        return await User.findById(userId,"username sex power create_time coin");
    }
}
module.exports = UserModel;
