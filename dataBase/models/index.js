'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
require('./../config/config');
var db = {};

let sequelize = new Sequelize(
  CONFIG.db_name,
  CONFIG.db_user,
  CONFIG.db_password,
  {
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
    logging: false,
    // operatorsAliases: 0,
    define: {
      timestamps: false,
      underscored: true,
    },
  }
);

const schemaCreate = async function () {
  const test = [];
  var schemas = await sequelize.showAllSchemas().then(
    (s) => {
      CONFIG.SCHEMAS.forEach((item) => {
        if (s.indexOf(item) < 0) {
          sequelize.createSchema(item).then((res) => { });
        }
      });
    },
    (err) => {
      console.log("in err", err);
    }
  );
  return schemas;
};

CONFIG.SCHEMAS.forEach((item) => {
  fs.readdirSync(__dirname + "/" + item)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      // console.log(file, "in file val");
      // if (file.indexOf('users.js') >= 0) {
      var model = require(path.join(__dirname + "/" + item, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[file.slice(0, -3)] = model;
      // }

      // console.log('in db new', db);
    });
});
// console.log(db, 'in db');
Object.keys(db).forEach((modelName) => {
  // console.log(modelName, 'in model', db['addresses']);
  if (db[modelName].association) {
    db[modelName].association(db);
  }
});
db.schemaCreate = schemaCreate();
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// }
module.exports = db;
