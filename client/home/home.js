'use strict';

angular.module('bookShowcase.home', ['bookShowcase.common', 'ui.router'])

.controller('HomeCtrl', ['$log', function($log) {
  var homeCtrl = this;
  $log.debug('in home ctrl');
}]);
