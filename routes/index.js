/*
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
*/



const multer = require('koa-multer');
const Router = require('koa-router');
const carController = require('../src/controller/car');
const UserController = require('../src/controller/user');
const router = new Router({
  prefix: '/api/v1'
});

/**
 * 测试接口
 */
router.post('/car/add',carController.add);
router.get('/car/getAll',carController.find);

/**
 * user接口
 *
 * @type {module:koa-router|Router|module:koa-router}
 */
router.post('/user/add',UserController.add);
router.post("/user/login",UserController.login);

module.exports = router;
