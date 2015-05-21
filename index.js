"use strict";

var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var WebSocketServer = require('ws').Server;

var logger = require('./lib/logger');
var config = require('./lib/config');
var apiRouter = require('./lib/routes/api');
var callbackRouter = require('./lib/routes/callback');

var app = express();

app.use(methodOverride());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/api', apiRouter);
app.use('/callback', callbackRouter);

app.use(function(err, req, res, next) {
  logger('err', err);
  res.status(500).json({ error: true, message: err.message });
});

var server = http.createServer(app);
var wss = new WebSocketServer({ server: server });

wss.on('connection', function (ws) {


  ws.on('close', function () {
    console.log('Client disconnected');
  });
});

server.listen(config.port, function() {
  console.log('Server started');
});
