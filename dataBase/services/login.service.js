let { to, TE } = require('../global_functions');
const randToken = require('rand-token');
const refreshTokens = {}
const validator = require('validator');
const loginTable = require('../models').login;
const bcrypt = require('bcrypt');
const mailService = require('./sendmain.service');
const cryptoService = require('./crypto.service');



const signin = async function (body) {
  console.log('body---->', body.email);
  if (validator.isEmail(body.email)) {
    let [err, user] = await to(loginTable.findOne({
      where: {
        email: body.email
      }
    }))
    if (err) return TE(err.message);
    if (!user) return TE("INVALID USER");
    // if (!user) return TE("Invalid username, Please try again.");
    if (user) {
      [err, passwordCheck] = await to(bcrypt.compare(body.password, user.password))
      if (err) return TE(err.message);
      if (!passwordCheck) return TE('INVALID LOGIN');
      // if (!passwordCheck) return TE(' Invalid login credentials, Please try again.');
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
    return TE('INVALID EMAIL');
    // return TE('Invalid Email');
  }
};
module.exports.signin = signin;

const signup = async function (body) {
  if (validator.isEmail(body.email)) {
    [err, user] = await to(loginTable.findOne({
      where: {
        email: body.email
      }
    }))
    if (err) return TE("Error occurs during signing up, Please try again later!")
    if (user) return TE("Email already exists")
    if (!user) {
      [err, encryptEmail] = await to(cryptoService.encrypt(body.email));
      if (encryptEmail) {
        console.log('encjkj---->', encryptEmail);
        [err, sendmail] = await to(mailService.sendMail(body.email,
          '<h3>Hello Sir/Madam,</h3><br><h3>Tap this link to register yourself.</h3><br><a href="http://localhost:55868/signupform/' + encryptEmail + '">link</a>', "ZENYO MANAGEMENT - Signup"));
        if (err) return TE(err);
        if (sendmail) return sendmail;
      }

    }
  }
  else {
    return TE('invalid Email..')
  }
}
module.exports.signup = signup