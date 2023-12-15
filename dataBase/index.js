require('./config/import');
require('./config/config');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


var indexRouter = require('./routes/v1');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors()); //this used to accept method...
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
const models = require('./models');

models.sequelize.authenticate().then(() => {
  console.log('connected to data base');
  const schema = models.schemaCreate.then(() => {
    models.sequelize.sync();
  });
}).catch((err) => {
  console.log("unable to connect database");
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Set to true if you need the website to include cookies in the requests sent
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT");
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Disable option for catch the response
  res.setHeader("Cache-Control", "no-cache ,no-store");
  // Pass to next layer of middleware
  next();
});

module.exports = app;
