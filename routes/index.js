const multer = require('koa-multer');
const Router = require('koa-router');
const UserController = require('../src/controller/user');
const ArticleController = require('../src/controller/article');
const CategoryController = require('../src/controller/category');
const HistoryController = require('../src/controller/history');
const CollectController = require('../src/controller/collect');
const LogController = require('../src/controller/log');
const UploadController = require('../src/controller/upload');
const MqloadController = require('../src/controller/mq');
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
router.post("/user/getAll",UserController.getAll);
router.get("/user/getByUser",UserController.getByUser);
router.post("/user/getCode",UserController.sendCode);

/**
 * article
 * @type {module:koa-router|Router|module:koa-router}
 */
router.post("/article/add",ArticleController.add);
router.get("/article/getAll",ArticleController.getAll);
router.post("/article/delete",ArticleController.deleteArticle);
router.get("/article/getOne",ArticleController.getOne);
router.post("/article/addComment",ArticleController.addComment);
router.get("/article/getByUser",ArticleController.getByUser);
router.get("/article/getBread",ArticleController.getBread);
router.put("/article/edit",ArticleController.edit);
router.put("/article/editStatus",ArticleController.editStatus);
/**
 *
 * category
 * @type {module:koa-router|Router|module:koa-router}
 */
router.post("/category/add",CategoryController.addCategory);
router.post("/category/addColumn",CategoryController.addColumn);
router.post("/category/delete",CategoryController.delete);
router.get("/category/getAll",CategoryController.getAll);


/**
 * history
 * @type {module:koa-router|Router|module:koa-router}
 */
router.get("/history/getAll",HistoryController.getAll);

/**
 * collect
 * @type {module:koa-router|Router|module:koa-router}
 */
router.post("/collect/add",CollectController.addCollect);
router.post("/collect/remove",CollectController.removeCollect);
router.get("/collect/getAll",CollectController.getAll);


/**
 * log
 * @type {module:koa-router|Router|module:koa-router}
 */
router.get("/log/getAll",LogController.getLog);


/**
 * upload
 * @type {module:koa-router|Router|module:koa-router}
 */
router.post("/upload",UploadController.upload);


/**
 * mq
 */
router.post("/mq/send",MqloadController.send);
router.post("/mq/receive",MqloadController.receive);



module.exports = router;
