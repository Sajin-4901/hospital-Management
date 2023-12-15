const nodemailer = require('nodemailer');
require('./../config/config');
const { to, ReS, ReE, TE } = require('../global_functions');
const sendMail = async function (toMail, mailContent, subject) {
  console.log(toMail, mailContent, subject);
  console.log("user---passs", CONFIG.user);
  const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.user,
      pass: CONFIG.pass
    },
    host: "smtp.gmail.com",
    port: 465
  });

  // for (let key in keyObject) {
  //   const replaceText = '%' + key + '%';
  //   const replaceRegExp = new RegExp(replaceText, 'g');
  //   mailContent = mailContent.replace(replaceRegExp, keyObject[key]);
  // }

  let composeMail = {
    from: 'sajinsajin492001@gmail.com',
    to: [toMail],
    subject: subject,
    html: mailContent,
  }
  let [error, response] = await to(sender.sendMail(composeMail));
  if (error) TE(error.message);
  console.log('response', response);
  if (response) return response;

}

module.exports.sendMail = sendMail;