angular.module('bookShowcase.component.login', []).directive('login', function() {
  return {
    restrict: 'EA',
    template: require('./login.html'),
    scope: {
      user: '='
    },
    controller: function() {
      var login = this;
      login.attemptLogin = function() {
        return console.log('i am called.');
      }
    },
    compile: function(elem, attrs) {
      console.log('compile called.');
      return function(scope, elem, attrs, controller) {
        console.log('link called.');
      }
    }
  }
});
