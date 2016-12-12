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
  'bookShowcase.common',
  'bookShowcase.login',
  'bookShowcase.home',
]).config(['$urlRouterProvider', '$stateProvider', 'bkAuth', function($urlRouterProvider, $stateProvider, bkAuth) {
  $stateProvider
    .state({
      name: 'authenticated',
      abstract: true,
      url: '/',
      resolve: {
        user: bkAuth.check()
      },
      template: '<div ui-view />'
    })
    .state({
      name: 'authenticated.login',
      url: '/login',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl',
      template: require('./login/login.html'),
    })
    .state({
      name: 'authenticated.home',
      url: '/home',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl',
      template: require('./home/home.html'),
    });

  // $urlRouterProvider.when('/', '/login');
  // $urlRouterProvider.otherwise('/login');
}]).run(['$rootScope', '$state', '$stateParams', 'bkAuth', function($rootScope, $state, $stateParams, bkAuth) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;
    bkAuth.check();
  });
}]);
