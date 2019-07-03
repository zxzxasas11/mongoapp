const multer = require('koa-multer');
const Router = require('koa-router');
const UserController = require('../src/controller/user');
const ArticleController = require('../src/controller/article');
const CategoryController = require('../src/controller/category');
const router = new Router({
  prefix: '/api/v1'
});

/**
 * user接口
 *
 * @type {module:koa-router|Router|module:koa-router}
 */
router.post('/user/add',UserController.add);
router.post("/user/login",UserController.login);

/**
 * 文章
 * @type {module:koa-router|Router|module:koa-router}
 */
router.post("/article/add",ArticleController.add);
router.get("/article/getAll",ArticleController.getAll);

/**
 *
 * category
 * @type {module:koa-router|Router|module:koa-router}
 */
router.post("/category/add",CategoryController.addCategory);
router.post("/category/addColumn",CategoryController.addColumn);
router.get("/category/getAll",CategoryController.getAll);
module.exports = router;
