angular.module('bookShowcase.common')
  .factory('bkSession', ['$q', '$log', function($q, $log) {
    const sessionData = {
      user: null,
      lastAuthResult: null
    };
    return {
      setUser(user) {
        return $q.when(this.setUserSync(user));
      },
      getUser() {
        return $q.when(this.getUserSync());
      },
      setLastAuthResult(status, reason) {
        return $q.when(this.setLastAuthResultSync(status, reason));
      },
      getLastAuthResult() {
        return $q.when(this.getLastAuthResultSync());
      },
      isAuthenticated() {
        return $q.when(this.isAuthenticatedSync());
      },
      setUserSync(user) {
        sessionData.user = user;
        this.setLastAuthResultSync({status: 'success'});
        return sessionData.user ;
      },
      getUserSync() {
        return sessionData.user;
      },
      setLastAuthResultSync(status, reason) {
        sessionData.lastAuthResult = {status, reason};
        return sessionData.lastAuthResult;
      },
      getLastAuthResultSync() {
        return sessionData.lastAuthResult;
      },
      isAuthenticatedSync() {
        return !!sessionData.user;
      }
    };
  }]);
