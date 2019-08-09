module.exports = async function(callback,params){
    let pageSize = parseInt(params.pageSize)||10,currentPage = parseInt(params.currentPage)||1;
    return callback.limit(pageSize).skip((currentPage-1)*pageSize);
};
