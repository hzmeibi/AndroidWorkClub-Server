var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./route');
var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser({
  uploadDir: __dirname + '/upload',
  keepExtensions: true,
  limit: '1000mb'
}));
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.all('*', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');//'X-Requested-With, Content-Type, Authorization');
 
 //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  //res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

routes(app);
module.exports = app;
