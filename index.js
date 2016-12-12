#!/usr/bin/env node

var log = require('./config/bunyan.js').createLogger('app');
var _ = require('lodash');
var config = require('./config/config');
var app = require('./config/express');
var http = require('http');

require('./config/sequelize');

// set port
var port = normalizePort(config.PORT || '5000');
app.set('port', port);

// start server
var server = http.createServer(app);

// start listen on port
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = typeof val === 'number' ? val : parseInt(val, 10);

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error('Port ' + port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error('Port ' + port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  log.info('Listening on port: ' + server.address().port);
}

