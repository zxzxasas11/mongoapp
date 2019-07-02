module.exports = {
    db: {
        url: 'mongodb://localhost/app',
        username:"admin",
        password:"123456"
    },
    port: process.env.port || '12345',
    uploadPath:"G:/upload"
    //Imgurl: process.env.NODE_ENV === 'production' ? 'http://www.didiheng.com:8888' : `http://192.168.31.226:5000`,
};
