angular.module('bookShowcase.login')
  .directive('loginBox', ['bkAuth', '$log', function(bkAuth, $log) {
    return {
      restrict: 'EA',
      template: require('./login.box.html'),
      scope: {
        onLogin: '&',
        onRegister: '&'
      },
      controllerAs: 'loginBox',
      controller: ['$scope', function($scope) {
        const loginBox = this;
        loginBox.authResult = {};
        
        loginBox.attemptLogin = function() {
          return bkAuth.login(loginBox.username, loginBox.password)
            .then(function(success) {
              if(success) {
                return $scope.onLogin();
              }
              loginBox.authResult = bkAuth.getLastAuthResultSync();
            });
        };
        loginBox.openRegister = function() {
          return $scope.onRegister();
        };
      }]
    };
  }]);
