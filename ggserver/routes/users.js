var express = require('express');
// 引入路由接口
var usersController = require('../controllers/users.js');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登陆
router.post('/login' , usersController.login );
// 注册
router.post('/register' , usersController.register );
// 退出
router.get('/verify' , usersController.verify );

router.get('/logout' , usersController.logout );
router.get('/getUser' , usersController.getUser );
router.post('/findPassword' , usersController.findPassword );
// router.get('/verifyImg' , usersController.verifyImg);

module.exports = router;
