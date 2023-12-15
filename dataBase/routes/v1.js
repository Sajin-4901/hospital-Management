var express = require('express');
var router = express.Router();
const login = require('../controllers/Login');
const generalInfo = require('../controllers/generalInfo');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.post('/postLoginUser', login.postUserLogin);
router.post('/signin', login.onSignIn);
router.get('/getCountry', generalInfo.getAllCountry);
router.post('/getState', generalInfo.getAllState);
router.post('/putCountry', generalInfo.addCountry);
router.post('/signup', login.onSignUp);
router.post('/decrypt', login.decrypt);



module.exports = router;
