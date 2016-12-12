angular.module('bookShowcase.common')
  .factory('bkAuth', ['$http', '$log', 'bkSession', '$state', '$rootScope',
    function($http, $log, bkSession, $state, $rootScope) {
      return {
        login(username, password) {
          return $http.post('/user/signin', {username: username, password: password})
            .then(function(response) {
              $log.debug(response.data.message);
              if(response.data.status === 'success') {
                bkSession.setUserSync(response.data.data.user);
                return true;
              }
              bkSession.setLastAuthResultSync('failure', response.data.data.info);
              return false;
            }).catch(function(err) {
              $log.debug('Error during signin: ', err);
              const info = 'There was an error signing in. Please try again!';
              bkSession.setLastAuthResultSync('failure', info);
              return false;
            });
        },
        logout() {
          return $http.get('/user/signout').then(function(response) {
            $log.debug(response.data.message);
            if(response.data.status === 'success') {
              bkSession.setUserSync(null);
              return true;
            }
            ;
            bkSession.setLastAuthResultSync('failure', response.data.message);
            return false;
          }).catch(function(err) {
            $log.debug('Error during signout: ', err);
            const info = 'There was an error signing out. Please try again!';
            bkSession.setLastAuthResultSync('failure', info);
            return false;
          });
        },
        refresh() {
          return $http.get('/user/me')
            .then(function(response) {
              $log.debug(response.data.message);
              if(response.data.status === 'success') {
                bkSession.setUserSync(response.data.data.user);
                return true;
              }
              bkSession.setLastAuthResultSync('failure', response.data.message);
              return false;
            }).catch(function(err) {
              $log.debug('Error refreshing signin info: ', err);
              bkSession.setLastAuthResultSync('failure', 'Error refreshing user info!');
              return false;
            });
        },
        check() {
          if(bkSession.isAuthenticatedSync()) {
            if($rootScope.toState === 'authenticated.login' || $rootScope.toState === '/') {
              return $state.go('authenticated.home');
            }
            return bkSession.getUserSync();
          }
          this.refresh().then(function(success) {
            if(success) {
              if($rootScope.toState === 'authenticated.login') {
                return $state.go('authenticated.home');
              }
              return bkSession.getUserSync();
            }
          });
          if($rootScope.toState !== 'authenticated.login') {
            return $state.go('authenticated.login');
          }
          return null;
        }
      };
    }]);
