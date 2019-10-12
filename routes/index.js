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
const HeroController = require('../src/controller/hero');
const MaterialController = require('../src/controller/material');
const EquipmentController = require('../src/controller/equipment');
const SpiderController = require('../src/controller/spider');
const SpidererrController = require('../src/controller/spidererr');
const ProjectController = require('../src/controller/project');
//const RoleController = require('../src/controller/role');
const router = new Router({
    prefix: '/api/v1'
});

router.post("/project/add",ProjectController.add);
router.get("/project/getById",ProjectController.getById);
router.get("/project/:id",ProjectController.getOne);
router.post("/project/category/add",ProjectController.addCategory);
/**
 * spider
 */
router.post("/spider/getJDLY",SpiderController.getJDLY);
router.post("/spider/download",SpiderController.download);
router.post("/spider/getLog",SpiderController.getSpiderLog);
router.get("/spider/getList/:currentPage",SpiderController.getList);
router.post("/spider/getByName",SpiderController.getByName);

router.post("/spidererr",SpidererrController.add);
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
router.post("/log/add",LogController.addLog);

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


/**
 * role
 * @type {module:koa-router|Router}
 */
//router.post("/role/add",RoleController.add);


router.post("/spider",SpiderController.spider);

/**
 * hero
 */
router.post("/hero/add",HeroController.add);
router.post("/hero/getAll",HeroController.getAll);
/**
 * material
 */
router.post("/material/add",MaterialController.add);
router.get("/material/getOne/:_id",MaterialController.getOne);
router.post("/material/getAll",MaterialController.getAll);
router.post("/material/test",MaterialController.test);
router.post("/material/import",MaterialController.import);

/**
 * equipment
 */
router.post("/equipment/add",EquipmentController.add);
router.post("/equipment/getAll",EquipmentController.getAll);
router.get("/equipment/:_id",EquipmentController.getOne);


module.exports = router;
