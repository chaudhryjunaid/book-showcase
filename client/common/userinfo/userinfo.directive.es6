angular.module('bookShowcase.common')
  .directive('bkUserInfo', ['bkSession', '$log', (bkSession, $log) => {
    return {
      template: require('./userinfo.html'),
      restrict: 'EA',
      replace: true,
      controller: function(bkSession) {
        console.log('inside ctrl: ', bkSession.getUserSync());
      },
      link: function($scope, $element, $attrs, $ctrl) {
        console.log('inside link', bkSession.getUserSync());
      }
    };
  }]);
