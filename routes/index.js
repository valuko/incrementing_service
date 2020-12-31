const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const {
  registerAction,
  loginAction,
  currentAction,
  nextAction,
  resetCurrentAction,
} = require('../controllers/indexController');

router.post('/v1/next', requireLogin, nextAction);
router.get('/v1/current', requireLogin, currentAction);
router.put('/v1/current', requireLogin, resetCurrentAction);

router.post('/v1/register', registerAction);
router.post('/v1/login', loginAction);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
