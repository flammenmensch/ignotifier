"use strict";

var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var logger = require('./lib/logger');
var config = require('./lib/config');
var routes = require('./lib/routes');
var socketFactory = require('./lib/socket');

var app = express();

app.use(methodOverride());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/api', routes.api);
app.use('/callback', routes.callback);

app.use(function(err, req, res, next) {
  logger('err', err);
  res.status(500).json({ error: true, message: err.message });
});

var server = http.createServer(app);
var socket = socketFactory(server);

server.listen(config.port, function(err) {
  if (err) {
    return console.error('Could not start server', err);
  }

  console.info('Server started');
});
