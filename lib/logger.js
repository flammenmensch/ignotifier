"use strict";

var logentries = require('node-logentries');
var config = require('./config');

var logger = logentries.logger({
  token: config.logentriesToken
});

module.exports = function(event, data) {
  return logger.log(event, data);
};
