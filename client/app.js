'use strict';

require('./bower_components/html5-boilerplate/dist/css/normalize.css');
require('./bower_components/html5-boilerplate/dist/css/main.css');
require('./app.css');

require('./bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js');
require('angular');
require('angular-ui-router');

require('./view1/view1.js');
require('./view2/view2.js');
require('./components/version/version.js');
require('./components/version/version-directive.js');
require('./components/version/interpolate-filter.js');

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state({
      name:'view1',
      url: '/view1',
      controller: 'View1Ctrl',
      template: require('./view1/view1.html'),
    })
    .state({
      name: 'view2',
      url: '/view2',
      controller: 'View2Ctrl',
      template: require('./view2/view2.html'),
    });

  $urlRouterProvider.when('/', '/view1');
  $urlRouterProvider.otherwise('/view1');
}]);
