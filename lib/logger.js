"use strict";

var logentries = require('node-logentries');
var config = require('./config');

module.exports = logentries.logger({
  token: config.logentriesToken
});
