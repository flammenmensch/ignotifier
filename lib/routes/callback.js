"use strict";

var express = require('express');
var request = require('request');

var config = require('../config');
var logger = require('../logger');
var router = express.Router();

router
  .route('/')
    .get(function (req, res, next) {
      var hubChallenge = req.query['hub.challenge'];
      var hubVerifyToken = req.query['hub.verify_token'];

      logger.log({ event: 'Subscription challenge', data: req.query });

      if (hubVerifyToken !== config.verifyToken) {
        return next(new Error('Incorrect verify token'));
      }

      return res.status(200).type('text/plain').send(hubChallenge);
    })
    .post(function(req, res, next) {
      logger.log({ event: 'Subscription data', data: req.body });

      return res.status(200).json({ status: "ok" });
    });

module.exports = router;
