var bunyan = require('bunyan');
var _ = require('lodash');

var loggers = {
  createLogger: function (name, options) {
    return loggers[name] || (loggers[name] = bunyan.createLogger(_.assign({name: name}, options)));
  }
};

module.exports = loggers;
