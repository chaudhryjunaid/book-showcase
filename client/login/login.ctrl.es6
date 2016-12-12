angular.module('bookShowcase.login')
  .controller('LoginCtrl', ['$state', 'bkSession', function($state, bkSession) {
    const loginCtrl = this;

    loginCtrl.loginSuccess = function() {
      bkSession.setUser(loginCtrl.user);
      $state.go('home');
    };
  }]);
