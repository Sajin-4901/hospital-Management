let { to, TE } = require('../global_functions');
const randToken = require('rand-token');
const refreshTokens = {}
const validator = require('validator');
const loginTable = require('../models').login;
const bcrypt = require('bcrypt');
const mailService = require('./sendmain.service');
const cryptoService = require('./crypto.service');
const emergencyContactTable =  require('../models').emergencyContact;
const permanentAddressTable =  require('../models').permanentAddress;
const presentAddressTable =  require('../models').presentAddress;
const userInfoTable =  require('../models').userInfo;
// const loginTable =  require('../models').login;



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
          '<h3>Hello Sir/Madam,</h3><br><h3>Tap this link to register yourself.</h3><br><a href="http://localhost:5000/signupform/' + encryptEmail + '">link</a>', "ZENYO MANAGEMENT - Signup"));
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


const signupRegistration = async function(body){
  let err,err1,err2,err3,err4,err5;
  let loginDetails = {};
  let userInfo = {};
  let presentAddress = {};
  let permanentAddress = {};
  let emergencyContact = {};
  console.log('bodyyyyyyyyy',body);

  [err,loginDetails] = await to(loginTable.create(body.createUser));
  console.log('error :',err);
  if(err) return TE(err)
  if(loginDetails){
    console.log('loginDetails :',loginDetails);
    body.employeeInfo['loginId'] = loginDetails.id;
    [err2,userInfo] = await to(userInfoTable.create(body.employeeInfo));
    if(err2) return TE(err2.message);
    body.contactInfo.presentAddress['loginId'] = loginDetails.id;
    [err3,presentAddress] = await to(presentAddressTable.create(body.contactInfo.presentAddress))
    if(err3) return TE(err3.message);
    if(body.contactInfo.permanentAddress.addressSame){
      body.contactInfo.presentAddress['addressSame']=true;
      [err1,permanentAddress] = await to(permanentAddressTable.create(body.contactInfo.presentAddress));
      if(err1) return TE(err1.message);
    }else{
      body.contactInfo.permanentAddress['loginId'] = loginDetails.id;
      [err4,permanentAddress] = await to(permanentAddressTable.create(body.contactInfo.permanentAddress))
      if(err4) return TE(err4.message);
    }
    body.contactInfo.emergencyContact['loginId'] = loginDetails.id;
    [err5,emergencyContact] = await to(emergencyContactTable.create(body.contactInfo.emergencyContact))
    if(err5) return TE(err5.message);
  }
  return {message : "Updated Successfully.."}
}
module.exports.signupRegistration = signupRegistration;


const emailExistsCheck = async function(body) {
  let err,user;
  [err,user] = await to(loginTable.findOne({
    where : {
      email: body.email
    }
  }))
  if(user) return {alreadyExist:true};
  if(!user) return {alreadyExist:false};
  if(err) return TE(err.message);
}
module.exports.emailExistsCheck = emailExistsCheck;


const forgotpasswordEmailCheck = async function(body) {
  let err,user;
  [err,user] = await to(loginTable.findOne({
    where : {
      email: body.email
    }
  }))
  if(user) return {emailNotExist:false};
  if(!user) return {emailNotExist:true};
  if(err) return TE(err.message);
}
module.exports.forgotpasswordEmailCheck = forgotpasswordEmailCheck;

const getEmployeeInfo = async function(body){
  let err,employee;
  [err,employee] = await to(log)
}
module.exports.getEmployeeInfo = getEmployeeInfo;