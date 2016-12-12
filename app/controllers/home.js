// home controller

var path = require('path');

module.exports.index = function (req, res) {
  return res.sendFile(path.join(config.root, 'client', 'index.html'));
};
