const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
//const logger = require('koa-logger');
const db = require('./src/mongoose/dbConnect');
const cors = require('koa2-cors');
const jwt = require('koa-jwt');
const JWTToken = require('./src/middleware/JWTToken');
const secret = require('./src/config/secret');
const JWTPath = require('./src/middleware/JWTPath');
// error handler



const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
//使用自己编辑中间件
const log4js = require('./src/logs/log4js');
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    //await log4js.resLogger(ctx, ms);
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});
app.on('error', async (err, ctx) => {
    //await log4js.errLogger(ctx, err);
    console.error('server error', err, ctx)
});

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method === 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});
app.use(cors()); //使用cors
// error handler
onerror(app);
app.use(JWTToken());
//设置过滤器
/*app.use(jwt({secret: secret.sign}).unless({
    path:JWTPath
}));*/


//区分管理员权限中间件
const powerControl = require("./src/middleware/powerControl");
app.use(powerControl());


// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}));
app.use(json());
//app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}));

const index = require('./routes/index');
// routes
app.use(index.routes(), index.allowedMethods());

const timeTask = require('./src/util/timedTask');
//timeTask();
//定时任务
// error-handling
const download = require('./src/spider/match/getTeam');
//download();
const getMeizitu = require('./src/spider/getPic');
//getMeizitu();
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
module.exports = app;
