angular.module('bookShowcase.common')
  .directive('bkUserInfo', ['bkSession', '$log', (bkSession, $log) => {
    return {
      template: require('./userinfo.html'),
      restrict: 'EA',
      replace: true,
      controllerAs: 'userInfo',
      controller: ['$log', 'bkSession', 'bkAuth', ($log, bkSession, bkAuth) => {
        const userInfo = this;
        $log.debug('user info controller called;');
        userInfo.user = bkSession.getUserSync();
        userInfo.authenticated = bkSession.isAuthenticatedSync();
        $log.debug('inside uic: ', userInfo.authenticated, userInfo.user);
      }]
    };
  }]);
