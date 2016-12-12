// user controller

var db = require('../../config/sequelize'),
  config = require('../../config/config'),
  passport = require('../../config/passport');


exports.create = function (req, res, next) {
  var user = db.User.build(req.body);

  user.provider = 'local';
  user.salt = user.makeSalt();
  user.hashedPassword = user.encryptPassword(req.body.password, user.salt);
  req.log.info('New User (local) : { id: ' + user.id + ' username: ' + user.username + ' }');

  return user.save().then(function () {
    return req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.send({status: 'success', message: 'User sign up successful.', data: {user: user}});
    });
  }).catch(next);
};

exports.signin = function (req, res, next) {
  return passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.log.info('Sign in failed with:', info);
      return res.status(401).json({status: 'error', message: 'Sign in failed: ', data: {info: info}});
    }
    return req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.send({status: 'success', message: 'Sign in successful.', data: {user: user}});
    });
  })(req, res, next);
};

exports.signout = function (req, res) {
  req.log.info('Logout: { id: ' + req.user.id + ', username: ' + req.user.username + '}');
  req.logout();
  return res.send({status: 'success', message: 'User logout successfully.'});
};

exports.me = function (req, res) {
  return res.jsonp({status: 'success', data: {user: req.user || null});
};
