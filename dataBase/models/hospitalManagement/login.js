'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const cryptoService = require('../../services/crypto.service');
let { ReS, ReE, to } = require('../../global_functions');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('login', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    modified: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }

  }, {
    tableName: 'login', schema: 'hospitalManagement'
  });
  Model.association = (models) => {
    Model.hasMany(models.userInfo, { foreignKey: 'loginId' });
  }
  //Class level methods to making the encrypted password and save this.
  Model.beforeSave(async (user, options) => {
    let err;
    // Hash the password if it has been changed or is new
    if (user.changed('password')) {
      let salt, hash;
      // Asynchronously generates a salt.
      // Randomly select rounds(b/w 4-10) for generating hash
      let rounds = Math.floor(Math.random() * 6 + 4);
      console.log('Rounds: ', rounds);
      [err, salt] = await to(bcrypt.genSalt(rounds));
      console.log('Salt: ', salt);
      if (err) {
        // logger.error('error in encryption in user account' + err.message);
        console.log('error in encryption in user account' + err.message);
      };

      //Asynchronously generates a hash with salt
      [err, hash] = await to(bcrypt.hash(user.password, salt));
      console.log('Hash: ', hash);
      if (err) {
        // logger.error('error in hash method in encryption' + err.message);
        console.log('error in hash method in encryption' + err.message);
      };

      user.password = hash;
    }
  });
  //Instance level methods to compare the password
  // Model.prototype.comparePassword = async function (pw) {
  //   let err, pass
  //   if (!this.password) TE(ERROR.password_notset);

  //   //Password verification
  //   [err, pass] = await to(bcrypt_p.compare(pw, this.password));
  //   if (err) TE(err);

  //   if (!pass) TE(ERROR.invalid_credentials);

  //   return this;
  // };
  //Instance level methods to get the jsonWebToken
  Model.prototype.getJwt = async function () {
    let err, encryptedToken;
    const token = "Bearer" + jwt.sign({
      id: this.id,
      email: this.email
    }, CONFIG.jwt_encryption, { expiresIn: CONFIG.jwt_expiration });
    // [err,encryptedToken] = await to(cryptoService.encrypt(token));
    // if(err) TE(err.message);
    return token;
  }

  return Model;
}