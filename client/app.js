// main

require('./bower_components/html5-boilerplate/dist/css/normalize.css');
require('./bower_components/html5-boilerplate/dist/css/main.css');
require('./node_modules/bootstrap/dist/css/bootstrap.css');
require('./app.styl');

require('./bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js');

require('lodash');
require('jquery');
require('bootstrap');
require('angular');
require('angular-ui-router');

// components
require('./components');

// common
require('./common');

// controllers
require('./login');
require('./home/home.js');

// Declare app level module which depends on views, and components
angular.module('bookShowcase', [
  'ui.router',
  'bookShowcase.components',
  'bookShowcase.login',
  'bookShowcase.home',
]).config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state({
      name: 'login',
      url: '/login',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl',
      template: require('./login/login.html'),
    })
    .state({
      name: 'home',
      url: '/home',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl',
      template: require('./home/home.html'),
    });

  $urlRouterProvider.when('/', '/login');
  $urlRouterProvider.otherwise('/login');
}]);
