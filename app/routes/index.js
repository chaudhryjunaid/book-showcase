var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var log = require('../../config/bunyan').createLogger('router');

log.info('Routes at: ', __dirname);
module.exports =
  _.chain(fs.readdirSync(__dirname))
  .filter(function(file) {
    return (file.indexOf('.js') > 0) && (file !== 'index.js')
  })
  .reduce(function(output, file) {
    log.info('Loading route file ' + file);
    var router = require(path.join(__dirname,file));
    var routeName = file === 'home.js' ? '' : path.basename(file, '.js') ;
    output['/'+routeName] = router;
    return output;
  },{})
  .value();
