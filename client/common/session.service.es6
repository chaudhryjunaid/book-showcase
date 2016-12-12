angular.module('bookShowcase.common')
  .service('bkSession', [function() {
    let sessionData = {
      user: null
    };
    return {
      setUser(user) {
        sessionData.user = user;
      },
      getUser() {
        return sessionData.user;
      }
    };
  }]);
