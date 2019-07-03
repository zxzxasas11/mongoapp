const User = require('../schema/user');
class UserModel {
    static async getAll(params){
        let pageSize  = parseInt(params.pageSize)||10;
        let currentPage = parseInt(params.currentPage)||1;
        return await User.find({},"code username sex email phone power coin user_id create_time")
            .sort({'create_time':-1});
    }
}
module.exports = UserModel;
