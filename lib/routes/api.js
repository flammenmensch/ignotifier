"use strict";

var qs = require('querystring');
var express = require('express');
var request = require('request');

var config = require('../config');
var router = express.Router();

router
  .route('/subscription')
    .get(function(req, res) {
      request.get(config.endpoint + '?client_secret=' + config.clientSecret + '&client_id=' + config.clientId).pipe(res);
    })
    .post(function(req, res) {
      console.log('Subscribing for', req.body);

      request.post({
        url: config.endpoint,
        body: qs.stringify({
          client_id: config.clientId,
          client_secret: config.clientSecret,
          callback_url: config.callbackUrl,
          object: 'tag',
          aspect: 'media',
          object_id: req.body.tag
        })
      }).pipe(res);
    })
    .delete(function(req, res) {
      request.delete(config.endpoint + '?client_secret=' + config.clientSecret + '&client_id=' + config.clientId + '&id=' + req.body.id).pipe(res);
    });

router
  .route('/subscription/removeall')
    .post(function(req, res) {
      request.delete(config.endpoint + '?client_secret=' + config.clientSecret + '&client_id=' + config.clientId + '&object=all').pipe(res);
    });

module.exports = router;
