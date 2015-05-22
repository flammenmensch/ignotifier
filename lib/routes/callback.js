"use strict";

var express = require('express');
var request = require('request');

var config = require('../config');
var logger = require('../logger');
var notifier = require('../notifier');

var router = express.Router();

function checkVerifyToken(req, res, next) {
  var verifyToken = req.query['hub.verify_token'];

  if (verifyToken !== config.verifyToken) {
    return next(new Error('Invalid verify token'));
  }

  return next();
}

router
  .route('/')
  .get(checkVerifyToken, function (req, res) {
    logger('info', { event: 'Subscription challenge', data: req.query });

    return res.status(200).type('text/plain').send(req.query['hub.challenge']);
  })
  .post(function(req, res, next) {
    logger('info', { event: 'Subscription update', data: req.body });

    notifier.emit('subscription update', req.body);

    return res.status(200).json({ status: "ok" });
  });

module.exports = router;
