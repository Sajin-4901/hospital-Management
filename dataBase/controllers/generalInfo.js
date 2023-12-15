let { ReS, ReE, to } = require('../global_functions');
const countryTable = require('../models').country;
const stateTable = require('../models').state;
const commonInfoService = require('../services/commonInfo.service');

let addCountry = async function (req, res) {
  let body = req.body;
  let err, countryDetails;
  [err, countryDetails] = await to(countryTable.bulkCreate(body))
  if (err) ReE(res, err, 422)
  if (countryDetails) ReS(res, { "result": "Countries updated successfully.." }, 200);
}
module.exports.addCountry = addCountry;

let getAllCountry = async function (req, res) {
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "VTgyNmJqS0xSeHdONUM2bjIwQkRCOEt4ZGNJUzh5MWdxNzlOZ3RjQg==");
  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };
  let err, getAllCountry;
  [err, getAllCountry] = await to(fetch("https://api.countrystatecity.in/v1/countries", requestOptions).then(response => response.text()).then(result => JSON.parse(result)).catch(error => new Error(error)))
  if (err) return ReE(res, err, 422)
  if (getAllCountry) return ReS(res, { results: getAllCountry, code: "get-all-countries-success-001", message: "Get all countries fetched successfully" }, 200);
}
module.exports.getAllCountry = getAllCountry;

let getAllState = async function (req, res) {
  let body = req.body.stateCode;
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "VTgyNmJqS0xSeHdONUM2bjIwQkRCOEt4ZGNJUzh5MWdxNzlOZ3RjQg==");
  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };
  let err, getAllState;
  [err, getAllState] = await to(fetch("https://api.countrystatecity.in/v1/countries/" + body + "/states", requestOptions).then(response => response.text()).then(result => JSON.parse(result)).catch(error => new Error(error)))

  // [err, getAllState] = await to(stateTable.findAll({
  //   where: {
  //     countryId: req.body.id
  //   }
  // }
  // ))
  if (err) return ReE(res, err, 422)
  if (getAllState) return ReS(res, { results: getAllState, code: "get-all-State-success-001", message: "Get all countries fetched successfully" }, 200);
}
module.exports.getAllState = getAllState;


