angular.module('bookShowcase.common')
  .directive('bkNavBar', () => {
    return {
      template: require('./navbar.html'),
      restrict: 'EA',
      scope: {
      },
      controllerAs: 'navbar',
      controller: [ () => {
      }]
    };
  });
