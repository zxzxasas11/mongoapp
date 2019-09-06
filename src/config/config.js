module.exports = {
    db: {
        url: 'mongodb://112.51.254.68/app',
        username:"admin",
        password:"123456"
    },
    port: process.env.port || '12345',
    uploadPath:"/usr/upload",
    redis:{
        host:"112.51.254.68",
        //host:"127.0.0.1",
        port:6379,
        db:0,
        password:""
    },
    download:{
        url:"C:/download"
    }
};
