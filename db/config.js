var _ = require('lodash');
var config = require('../config/config');
var log = require('../config/bunyan').createLogger('migrate');

var dbConfig = {};
dbConfig[config.NODE_ENV] = _.assign(config.db, {
  "logging": log.info.bind(log)
});

module.exports = dbConfig;
