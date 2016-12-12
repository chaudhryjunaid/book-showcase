angular.module('bookShowcase.login')
  .service('loginSvc', ['$http', '$log', function($http, $log) {
    const loginSvcObject = {
      user: null,
      info: null
    };
    const login = function(username, password) {
      return $http.post('/user/signin', {username: username, password: password})
        .then(function(response) {
          $log.debug(response.data.message);
          if(response.data.status === 'success') {
            loginSvcObject.user = response.data.data.user;
            return true;
          } else {
            loginSvcObject.info = response.data.data.info;
            return false;
          };
        }).catch(function(err) {
          $log.debug('Error during signin: ', err);
          loginSvcObject.info = 'There was an error signing in. Please try again!';
          return false;
        });
    };
    const logout = function() {
      return $http.get('/user/signout').then(function(response) {
        $log.debug(response.data.message);
        if(response.data.status === 'success') {
          loginSvcObject.user = null;
        };
        return true;
      }).catch(function(err) {
        $log.debug('Error during signout: ', err);
        loginSvcObject.info = 'There was an error signing out. Please try again!';
        return false;
      });
    };
    loginSvcObject.login = login;
    loginSvcObject.logout = logout;

    return loginSvcObject;
  }]);
