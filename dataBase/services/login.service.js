let { to, TE } = require('../global_functions');
const randToken = require('rand-token');
const refreshTokens = {}
const validator = require('validator');
const loginTable = require('../models').login;
const bcrypt = require('bcrypt');


const signin = async function (body) {
  if (validator.isEmail(body.email)) {
    let [err, user] = await to(loginTable.findOne({
      where: {
        email: body.email
      }
    }))
    if (err) return TE(err.message);
    if (!user) return TE("Invalid username, Please try again.");
    if (user) {
      [err, passwordCheck] = await to(bcrypt.compare(body.password, user.password))
      if (err) return TE(err.message);
      if (!passwordCheck) return TE(' Invalid login credentials, Please try again.');
      if (passwordCheck) {
        let loginUser = {};
        loginUser['user'] = user;
        [err, token] = await to(user.getJwt());
        if (err) return TE(err.message);
        if (token) {
          loginUser['token'] = token;
        }
        var refreshToken = randToken.uid(256)
        refreshTokens['refreshToken'] = {
          user: user
        }
        if (refreshToken) loginUser['refreshToken'] = refreshToken;
        console.log("login------", loginUser);
        return loginUser;
      }
    }
    if (err) return TE(err.message);
  } else {
    return TE('Invalid Email');
  }
};
module.exports.signin = signin;