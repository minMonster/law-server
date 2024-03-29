const router = require('koa-router')();
const addMessage = require('../controller/messageBoardController.js').addMessage;
const addLaw = require('../controller/addLaw.js').addLaw;
const getLawList = require('../controller/lawList.js').getLawList;
const getCountry = require('../controller/addLaw.js').getCountry;
const delll = require('../controller/addLaw.js').delll;
const getLawDetail = require('../controller/lawList.js').getLawDetail;
const getService = require('../controller/getService.js').getService;
const Demo = require('../controller/addLaw.js').Demo;
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  });
});

router.post('/add-message', addMessage);
router.post('/add-law', addLaw);
router.get('/law-list', getLawList);
router.get('/area-list', getCountry);
router.get('/service-list', getService);
router.get('/law-detail', getLawDetail);
router.get('/add-law-json', Demo);
router.post('/delll', delll);
router.post('/commit-log', require('../controller/addCommitLog.js').addCommitLog);
router.post('/commit-log-list', require('../controller/addCommitLog.js').getCommitLog);
module.exports = router;
