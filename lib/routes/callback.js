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

    var hubChallenge = req.query['hub.challenge'];

    return res.status(200).type('text/plain').send(hubChallenge);
  })
  .post(function(req, res, next) {
    logger('info', { event: 'Subscription update', data: req.body });

    return res.status(200).json({ status: "ok" });
  });

module.exports = router;
