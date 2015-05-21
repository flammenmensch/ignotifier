"use strict";

var express = require('express');
var request = require('request');

var config = require('../config');
var router = express.Router();

router
  .route('/')
    .get(function (req, res, next) {
      var hubChallenge = req.query['hub.challenge'];
      var hubVerifyToken = req.query['hub.verify_token'];

      if (hubVerifyToken !== config.verifyToken) {
        return next(new Error('Incorrect verify token'));
      }

      return res.status(200).type('text/plain').send(hubChallenge);
    });

module.exports = router;
