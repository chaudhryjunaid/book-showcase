// session middleware

var config = require('./../../config/config'),
    session = require('express-session'),
    db = require('./../../config/sequelize') ;

var sequelizeStore = require('express-sequelize-session')(session.Store);

var sessionMiddleware = session({
    resave: true,
    saveUninitialized: true,
    store: new sequelizeStore(db.sequelize),
    cookie:{maxAge:1000*3600*24*7}, //remember for 7 days
    secret: config.expressSessionSecret ||'$uper$ecret$e$$ionKey'
});

module.exports = sessionMiddleware;
