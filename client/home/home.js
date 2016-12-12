'use strict';

angular.module('bookShowcase.home', ['bookShowcase.common'])

.controller('HomeCtrl', ['$log', 'bkSession', function($log, bkSession) {
  var homeCtrl = this;
  $log.debug('in home ctrl');
}]);
