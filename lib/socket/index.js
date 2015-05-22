"use strict";

var socketio = require('socket.io');
var notifier = require('../notifier');

var clients = [ ];

notifier.on('subscription update', function(data) {
  clients.forEach(function(client) {
    client.emit('subscription update', data);
  });
});

module.exports = function(server) {
  var io = socketio(server);

  io.on('connection', function(socket) {
    clients.push(socket);

    socket.on('disconnect', function() {
      var index = clients.indexOf(socket);
      clients.splice(index, 1);
    });
  });

  return io;
};
