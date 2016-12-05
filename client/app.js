'use strict';

require('./bower_components/html5-boilerplate/dist/css/normalize.css');
require('./bower_components/html5-boilerplate/dist/css/main.css');
require('./app.css');

require('./bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js');
require('angular');
require('angular-route');
require('./app.js');
require('./view1/view1.js');
require('./view2/view2.js');
require('./components/version/version.js');
require('./components/version/version-directive.js');
require('./components/version/interpolate-filter.js');

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
