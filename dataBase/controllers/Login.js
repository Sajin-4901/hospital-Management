let { ReS, ReE, to } = require('../global_functions');
const loginTable = require('../models').login;
const loginservice = require('../services/login.service');
const cryptoService = require('../services/crypto.service');

const postUserLogin = async function (req, res) {
  let body = req.body;
  let err, userDetails;
  console.log("-----", body);
  [err, userDetails] = await to(loginTable.create(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, userDetails, 200);
}
module.exports.postUserLogin = postUserLogin;

const onSignIn = async function (req, res) {
  let body = req && req.body;
  // let loginUser = [];

  [err, user] = await to(loginservice.signin(body));
  if (err) return ReE(res, err, 422);
  if (user) return ReS(res, user, 200);
}
module.exports.onSignIn = onSignIn;

const onSignUp = async function (req, res) {
  let body = req && req.body;
  [err, user] = await to(loginservice.signup(body));
  if (err) return ReE(res, err, 422);
  if (user) return ReS(res, user, 200);
}
module.exports.onSignUp = onSignUp;

const decrypt = async function (req, res) {
  let body = req && req.body;
  console.log('body :',body);
  [err, user] = await to(cryptoService.decrypt(body));
  if (err) return ReE(res, err, 422);
  if (user) return ReS(res, user, 200);
}
module.exports.decrypt = decrypt;