angular.module('bookShowcase.common')
  .factory('bkAuth', ['$http', '$log', 'bkSession', '$q',
    function($http, $log, bkSession, $q) {
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
            .then((response) => {
              $log.debug('Server auth response: ', response.data);
              if(response.data.status === 'success') {
                $log.debug('user=', response.data.data.user);
                bkSession.setUserSync(response.data.data.user);
                return true;
              }
              bkSession.setLastAuthResultSync('failure', response.data.message);
              return false;
            }).catch((err) => {
              $log.debug('Error refreshing auth info: ', err);
              bkSession.setLastAuthResultSync('failure', 'Error refreshing user info!');
              return false;
            });
        },
        check() {
          if(!bkSession.isAuthenticatedSync()) {
            return this.refresh().catch((err) => {
              $log.debug('Error refreshing user auth status: ', err);
              return false;
            });
          }
          return $q.when(true);
        }
      };
    }]);
