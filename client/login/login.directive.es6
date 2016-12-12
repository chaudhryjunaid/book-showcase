angular.module('bookShowcase.login')
  .directive('login', ['loginSvc', '$log', function(loginSvc, $log) {
    return {
      restrict: 'EA',
      template: require('./login.box.html'),
      scope: {
        onLogin: '&',
        loggedInUser: '='
      },
      controllerAs: 'loginBox',
      controller: ['$scope', function($scope) {
        const loginBox = this;
        loginBox.attemptLogin = function() {
          return loginSvc.login(loginBox.username, loginBox.password)
            .then(function(success) {
              if(success) {
                $scope.loggedInUser = loginSvc.user;
                $scope.onLogin();
              }
            });
        };
      }]
    };
  }]);
