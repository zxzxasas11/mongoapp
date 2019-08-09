module.exports = async function(callback,params){
    let pageSize = params.pageSize||10,currentPage = params.currentPage||1;
    console.log(currentPage);
    return callback.limit(parseInt(pageSize)).skip(parseInt(currentPage));
};
