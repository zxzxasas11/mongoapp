let mongoose = require('mongoose');
let async = require('async');
/**
 * 分页插件
 * @param Model
 * @param params
 * @param sort
 * @returns {Promise<void>}
 */
module.exports = async function(Model,params,field,sort,mohu){
    let pageSize = parseInt(params.pageInfo.pageSize)||10,
        currentPage = parseInt(params.pageInfo.currentPage)||1;
    let aa =[];
    for(let i in mohu){
        for(let j in params.condition){
            if(mohu[i]===j){
                let a = {};
                a[j] = {$regex:params.condition[j]};
                aa.push(a);
                delete params.condition[j]
            }
        }
    }
    return await async.parallel({
        count: function (done) {  // 查询数量
            if(aa.length>0){
                Model.countDocuments(params.condition).and(aa).exec(function (err, count) {
                    done(err, count);
                });
            }
            else{
                Model.countDocuments(params.condition).exec(function (err, count) {
                    done(err, count);
                });
            }
        },
        data: function (done) {   // 查询一页的记录
            if(aa.length>0){
                Model.find(params.condition,field).and(aa).skip((currentPage-1)*pageSize).limit(pageSize).
                sort(sort).
                //.populate(populate).sort(sortParams).
                exec(function (err, doc) {
                    done(err, doc);
                });
            }
            else{
                Model.find(params.condition,field).skip((currentPage-1)*pageSize).limit(pageSize).
                sort(sort).
                //.populate(populate).sort(sortParams).
                exec(function (err, doc) {
                    done(err, doc);
                });
            }
        }
    });
};
