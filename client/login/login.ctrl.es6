angular.module('bookShowcase.login')
  .controller('LoginCtrl', ['$state', 'bkAuth', function($state, bkAuth) {
    const loginCtrl = this;

    loginCtrl.loginSuccess = function() {
      $state.go('home');
    };
  }]);
