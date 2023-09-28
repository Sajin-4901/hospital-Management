let { ReS, ReE, to } = require('../global_functions');

postUserLogin = async function(req,res) {
let body = req.body;
let err,userDetails;
[err,userDetails] = await to(loginTable.create(body));
console.log("-----",err);
if (err) return ReE(res, err, 422);
return ReS(res, userDetails);
}
module.exports.postUserLogin = postUserLogin;