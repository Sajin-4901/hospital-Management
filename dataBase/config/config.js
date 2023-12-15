require('dotenv').config();

CONFIG = {};
CONFIG.SCHEMAS = [
  'hospitalManagement',
  'data'
];
CONFIG.user = process.env.user;
CONFIG.secretKey = process.env.SECRETKEY;
CONFIG.pass = process.env.pass;
CONFIG.db_host = process.env.DB_HOST;
CONFIG.db_port = process.env.DB_PORT;
CONFIG.db_name = process.env.DB_NAME;
CONFIG.db_user = process.env.DB_USER;
CONFIG.db_password = process.env.DB_PASSWORD;
CONFIG.db_dialect = process.env.DB_DIALECT;
// CONFIG.jwt_encryption = process.env.jwt_encryption
CONFIG.jwt_encryption = process.env.jwt_encryption;
CONFIG.jwt_expiration = process.env.jwt_expiration;
CONFIG.environment = process.env.APP;