// main

require('./bower_components/html5-boilerplate/dist/css/normalize.css');
require('./bower_components/html5-boilerplate/dist/css/main.css');
require('./node_modules/bootstrap/dist/css/bootstrap.css');
require('./app.styl');

require('./bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js');

require('lodash');
$ = require('jquery');
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
  'bookShowcase.home'
]).config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state({
      name: 'authenticated',
      abstract: true,
      template: '<div ui-view />',
      resolve: {
        authenticated: ['bkAuth', function(bkAuth) {
          return bkAuth.check();
        }]
      }
    })
    .state({
      name: 'anon',
      abstract: true,
      template: '<div ui-view />'
    })
    .state({
      name: 'anon.login',
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

  $urlRouterProvider.when('/', '/home');
  $urlRouterProvider.otherwise('/home');
}]).run(['$rootScope', '$state', '$stateParams', 'bkAuth', '$log', function($rootScope, $state, $stateParams, bkAuth, $log) {
  $rootScope.$on('$stateChangeStart', (event, toState, toStateParams) => {
    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;
    $log.debug('state=', toState);
    bkAuth.check().then((authorized) => {
      $log.debug('User authorized: ', authorized);
      if(!authorized &&  /^anon\./.test(toState.name)) {
        $log.debug('User logged out; redirecting to login.');
        $rootScope.returnToState = $rootScope.toState;
        $rootScope.returnToStateParams = $rootScope.toStateParams;
        $state.go('login');
      } else if(authorized && /^anon\./.test(toState.name)) {
        $log.debug('User logged in; redirecting to home.');
        $state.go('authenticated.home');
      }
    });
  });
}]);
