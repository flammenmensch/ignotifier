"use strict";

var express = require('express');
var request = require('request');

var config = require('../config');
var logger = require('../logger');
var router = express.Router();

router
  .route('/')
  .get(function (req, res, next) {
    logger('info', { event: 'Subscription challenge', data: req.query });

    var challenge = req.query['hub.challenge'];
    var verifyToken = req.query['hub.verify_token'];

    if (verifyToken !== config.verifyToken) {
      return next(new Error('Invalid verify token'));
    }

    return res.status(200).type('text/plain').send(challenge);
  })
  .post(function(req, res, next) {
    logger('info', { event: 'Subscription update', data: req.body });

    return res.status(200).json({ status: "ok" });
  });

module.exports = router;
