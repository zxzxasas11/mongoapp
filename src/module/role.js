const Role = require('../schema/role');
const mongoose = require('mongoose');
const moment = require('moment');
class RoleModel {
    static async add(params){
        let role = new Role(params);
        return await role.save();
    }
}
module.exports = RoleModel;
