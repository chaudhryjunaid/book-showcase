angular.module('bookShowcase.common')
  .directive('bkNavBar', () => {
    return {
      template: require('./navbar.html'),
      restrict: 'EA',
      scope: {
        onPage: '='
      },
      controllerAs: 'navbar',
      controller: ['bkSession', (bkSession) => {
        var navbar = this;
        navbar.authenticated = bkSession.isAuthenticatedSync();
      }]
    };
  });
