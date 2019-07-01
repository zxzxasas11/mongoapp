const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const db = require('./src/mongoose/dbConnect');
const users = require('./routes/users');

const cors = require('koa2-cors');
const jwt = require('koa-jwt');
const JWTToken = require('./src/middleware/JWTToken');
const secret = require('./src/config/secret');
const JWTPath = require('./src/middleware/JWTPath');
// error handler

app.use(cors()); //使用cors
// error handler
onerror(app);
app.use(JWTToken());
//设置过滤器
app.use(jwt({secret: secret.sign}).unless({
  path:JWTPath
}));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
const index = require('./routes/index')
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
