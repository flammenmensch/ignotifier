"use strict";

var env = process.env;

module.exports = {
  "rootUrl": env.ROOT_URL,
  "clientId": env.CLIENT_ID,
  "clientSecret": env.CLIENT_SECRET,
  "callbackUrl": env.CALLBACK_URL,
  "endpoint": env.API_URL,
  "verifyToken": env.VERIFY_TOKEN,
  "port": env.PORT
};
