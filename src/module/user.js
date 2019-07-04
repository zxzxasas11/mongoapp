const User = require('../schema/user');
const mongoose = require('mongoose');
class UserModel {
    static async getAll(params){
        //let pageSize  = parseInt(params.pageSize)||10;
        //let currentPage = parseInt(params.currentPage)||1;
        //mongoose.Types.ObjectId()
        let sql = params.id?{'_id':params.id}:{};
        return await User.find(sql,"code create_time username sex email phone power coin")
            .sort({'create_time':-1});
    }
}
module.exports = UserModel;
