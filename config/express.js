var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var expressBunyanLogger = require('express-bunyan-logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var _ = require('lodash');

var config = require('./config');
var sessionMiddleware = require('../app/middlewares/session');
var passport = require('./passport');
var home = require('../app/controllers/home');

var app = express();


app.set('showStackError', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Prettify HTML
app.locals.pretty = true;

//Should be placed before express.static
app.use(compression({
  filter: function (req, res) {
    return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
  },
  level: 9
}));

app.use(express.static(config.root + '/client'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
app.use(expressBunyanLogger({
  name: 'express',
  excludes: ['user-agent', 'body', 'short-body', 'req-headers', 'res-headers', 'req', 'res', 'incoming', 'response-hrtime']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//express session configuration
app.use(sessionMiddleware);

//use passport session
app.use(passport.initialize());
app.use(passport.session());

// setup routes
var routes = require('../app/routes');
_.each(routes, function (val, key) {
  app.use(key, val);
});

app.get('*', home.index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {

  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    data: {err: err}
  });
});

module.exports = app;
