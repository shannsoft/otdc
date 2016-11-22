angular.module('Authentication', [])
    .factory('LoginService',function($http,$resource,ApiGenerator) {
      return $resource('/',null, {
        login: ApiGenerator.getApi('login'),
        logout: ApiGenerator.getApi('logout'),
        token: ApiGenerator.getApi('token'),
      });
    })
    .controller('LoginController',function($scope,$state,$rootScope,LoginService,Events,$localStorage,Constants,UserService) {
      $scope.init = function(){
        $scope.user = {};
      }
      $scope.login = function() {
        // $rootScope.loggedin = $localStorage[Constants.getLoggedIn()] = true;
        // $state.go('dashboard');
        LoginService.login($scope.user,function(response) {
          $localStorage[Constants.getTokenKey()] = response.Data.tokenId;
          $localStorage[Constants.getLoggedIn()] = true;
          $rootScope.loggedin = $localStorage[Constants.getLoggedIn()];
          UserService.setUser(response.Data);
          // console.log('UserService.getUser()  ',UserService.getUser());
          $state.go('dashboard');
        },function(err) {
          // $state.go('login');
          $rootScope.$emit(Events.errorInLogin,{type:Events.eventType.error});
          $state.go('login');
        })
      }
      $scope.logOut = function() {
        $localStorage[Constants.getTokenKey()] = null;
        $localStorage[Constants.getLoggedIn()] = false;
        $rootScope.loggedin = $localStorage[Constants.getLoggedIn()];
        UserService.setUser(null);

          // LoginService.logOut({UID:UserService.getUser().TKN_USM_ID},function(response) {
          //   $rootScope.$emit(Events.successInLogout,{type:Events.eventType.success});
          //   $rootScope.loggedin = false;
          //   $state.go('login');
          // },function(err) {
          //   // $state.go('login');
          //   $rootScope.$emit(Events.errorInLogout,{type:Events.eventType.error});
          //   $rootScope.loggedin = false;
          //   $state.go('login');
          // })

          $state.go('login');
      }
    })
;
