angular.module('Authentication', [])
    .factory('LoginService',function($http,$resource,ApiGenerator) {
      return $resource('/',null, {
        login: {
          method: ApiGenerator.getApi('login')['method'],
          url:ApiGenerator.getApi('login')['url'],
        },
        logOut: {
          method: ApiGenerator.getApi('logOut')['method'],
          url:ApiGenerator.getApi('logOut')['url'],
        },
      });
    })
    .controller('LoginController',function($scope,$state,$rootScope,LoginService,Events) {
      $scope.init = function(){
        $scope.user = {};
      }
      $scope.login = function() {
          $rootScope.is_loggedin = true;
        LoginService.login($scope.user,function(response) {
          $rootScope.$emit(Events.successInLogin,{type:Events.eventType.success});
          $state.go('dashboard');
        },function(err) {
          // $state.go('login');
          $rootScope.$emit(Events.errorInLogin,{type:Events.eventType.error});
          $state.go('dashboard');
        })
      }
      $scope.logOut = function() {
          // $rootScope.is_loggedin = false;
          // $state.go('login');
          LoginService.logOut({UID:1000},function(response) {
            $rootScope.$emit(Events.successInLogout,{type:Events.eventType.success});
            $rootScope.is_loggedin = false;
            $state.go('login');
          },function(err) {
            // $state.go('login');
            $rootScope.$emit(Events.errorInLogout,{type:Events.eventType.error});
            $rootScope.is_loggedin = false;
            $state.go('login');
          })
      }
    })
;
