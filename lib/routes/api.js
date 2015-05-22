"use strict";

var qs = require('querystring');
var express = require('express');
var request = require('request');

var logger = require('../logger');
var config = require('../config');
var router = express.Router();

router.route('/subscription')
  .get(function(req, res) {
    logger('info', { event: 'listSubscriptions' });

    request({
      url: config.endpoint + '?client_secret=' + config.clientSecret + '&client_id=' + config.clientId,
      method: 'GET'
    }).pipe(res);
  })
  .post(function(req, res) {
    logger('info', { event: 'subscribe', data: req.body.tag });

    request({
      url: config.endpoint,
      method: 'POST',
      body: qs.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        callback_url: config.callbackUrl,
        verify_token: config.verifyToken,
        object: 'tag',
        aspect: 'media',
        object_id: req.body.tag
      })
    }).pipe(res);
  })
  .delete(function(req, res) {
    logger('info', { event: 'unsubscribeFromAll' });

    request({
      url: config.endpoint + '?client_secret=' + config.clientSecret + '&client_id=' + config.clientId + '&object=all',
      method: 'DELETE'
    }).pipe(res);
  });

router.route('/subscription/:id')
  .delete(function(req, res) {
    logger('info', { event: 'unsubscribe', data: req.params.id });

    request({
      url: config.endpoint + '?client_secret=' + config.clientSecret + '&client_id=' + config.clientId + '&id=' + req.params.id,
      method: 'DELETE'
    }).pipe(res);
  });

module.exports = router;
