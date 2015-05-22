"use strict";

var app = angular.module('app', []);

app.factory('SubscriptionService', function($http) {
  function list() {
    return $http.get('/api/subscription').then(function(response) {
      return response.data.data;
    });
  }

  function subscribe(tag) {
    return $http.post('/api/subscription', { tag: tag });
  }

  function unsubscribe(id) {
    return $http.delete('/api/subscription/' + id);
  }

  function clear() {
    return $http.delete('/api/subscription/');
  }

  function sendFakeData() {
    return $http.post('/callback', [
      {
        "subscription_id": '1',
        "object": 'tag',
        "object_id": 'happygeeks',
        "changed_aspect": 'media',
        "time": Date.now()
      },
      {
        "subscription_id": '2',
        "object": 'tag',
        "object_id": 'happygeeks',
        "changed_aspect": 'media',
        "time": Date.now()
      }
    ]);
  }

  return {
    list: list,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    clear: clear,
    sendFakeData: sendFakeData
  };
});

app.controller('SubscriptionListCtrl', function($rootScope, SubscriptionService) {
  var self = this;

  this.subscriptions = [];
  this.busy = false;

  this.listSubscriptions = function() {
    self.busy = true;

    SubscriptionService.list()
      .then(function(items) {
        self.subscriptions = items;
      })
      .finally(function() {
        self.busy = false;
      });
  };

  this.unsubscribe = function(id) {
    self.busy = true;

    SubscriptionService.unsubscribe(id)
      .then(function() {
        self.listSubscriptions();
      })
      .finally(function() {
        self.busy = false;
      });
  };

  $rootScope.$on('app:subscriptions-changed', this.listSubscriptions);

  this.listSubscriptions();
});

app.controller('FormCtrl', function($rootScope, SubscriptionService) {
  var self = this;

  this.busy = false;
  this.tagName = '';

  this.sendFakeData = function() {
    self.busy = true;

    SubscriptionService.sendFakeData().finally(function() {
      self.busy = false;
    });
  };

  this.createSubscription = function() {
    self.busy = true;

    SubscriptionService.subscribe(self.tagName)
      .then(function() {
        $rootScope.$broadcast('app:subscriptions-changed');
      })
      .finally(function() {
        self.busy = false;
        self.tagName = '';
      });
  };
});
