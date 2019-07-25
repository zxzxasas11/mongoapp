module.exports = {
    db: {
        url: 'mongodb://localhost/app',
        username:"admin",
        password:"123456"
    },
    port: process.env.port || '12345',
    uploadPath:"G:/upload",
    redis:{
        host:"127.0.0.1",
        port:6379,
        db:0,
        password:""
    }
};
