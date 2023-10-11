var express = require('express');
var router = express.Router();
const login = require('../controllers/Login');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.post('/postLoginUser', login.postUserLogin);
router.post('/signin', login.onSignIn);



module.exports = router;
