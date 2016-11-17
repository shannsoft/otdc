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
    .controller('LoginController',function($scope,$state,$rootScope,LoginService) {
      $scope.init = function(){
        $scope.user = {};
      }
      $scope.login = function() {
          $rootScope.is_loggedin = true;
        LoginService.login($scope.user,function(response) {
          $state.go('dashboard');
        },function(err) {
          // $state.go('login');
          $state.go('dashboard');
        })
      }
      $scope.logOut = function() {
          $rootScope.is_loggedin = false;
          $state.go('login');
      }
    })
;
