'use strict';

var passport = require('passport'),
  _ = require('lodash'),
  LocalStrategy = require('passport-local').Strategy,
  config = require('./config'),
  db = require('./sequelize'),
  log = require('./bunyan').createLogger('passport');


passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  return db.User.find({where: {id: id}}).then(function (user) {
    if (!user) {
      log.warn('Logged in user not in database, user possibly deleted post-login');
      return false;
    }
    log.info('Session: { id: ' + user.id + ', username: ' + user.username + ' }');
    return user;
  }).asCallback(done);
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    return db.User.find({where: {username: username}}).then(function (user) {
      if (!user) {
        done(null, false, {message: 'Unknown user'});
      } else if (!user.authenticate(password)) {
        done(null, false, {message: 'Invalid password'});
      } else {
        log.info('Login (local) : { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
      }
      return null;
    }).catch(function (err) {
      done(err);
    });
  }
));

module.exports = passport;
