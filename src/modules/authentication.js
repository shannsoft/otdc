angular.module('Authentication', [])
    // .factory('LoginService',function($http,$resource,ApiGenerator) {
    //   return $resource('/',null, {
    //     login: ApiGenerator.getApi('login'),
    //     logout: ApiGenerator.getApi('logout'),
    //     token: ApiGenerator.getApi('token'),
    //     forgotPassword: ApiGenerator.getApi('forgotPassword')
    //   });
    // })
    .controller('LoginController',function($http,$scope,$state,$rootScope,ApiCall,UtilityService,Events,$localStorage,Constants,UserService,Util,ApiGenerator,validationService) {
      $scope.init = function(){
        $scope.user = {};
        if($localStorage[Constants.getIsRemember()]){
          $scope.user.userId = $localStorage[Constants.getUsername()];
          $scope.user.Password = UtilityService.decode($localStorage[Constants.getPassword()]);
          $scope.user.remember = $localStorage[Constants.getIsRemember()];
        }
        $scope.validationService = validationService;
        $scope.isInit = true; // this flag used to load the form after controller init
      }
      $scope.login = function(loginfrm) {
        // $rootScope.loggedin = $localStorage[Constants.getLoggedIn()] = true;
        // $state.go('dashboard');
        console.log(loginfrm);
        ApiGenerator.getApi('login');
        UtilityService.showLoader();
        ApiCall.login(JSON.stringify($scope.user),function(response) {
          if(response.StatusCode == 200){
            UtilityService.hideLoader();
            $localStorage[Constants.getTokenKey()] = response.Data.tokenId;
            $localStorage[Constants.getLoggedIn()] = true;
            $rootScope.loggedin = $localStorage[Constants.getLoggedIn()];
            UserService.setUser(response.Data);
            // saving / removing remember me data
            if($scope.user.remember){
              $localStorage[Constants.getUsername()] = $scope.user.userId;
              $localStorage[Constants.getPassword()] = UtilityService.encode($scope.user.Password);
              $localStorage[Constants.getIsRemember()] = true;
            }
            else{
              delete $localStorage[Constants.getUsername()];
              delete $localStorage[Constants.getPassword()];
              delete $localStorage[Constants.getIsRemember()];
            }
            $state.go('dashboard');
          }
          else{
            Util.alertMessage("danger", response.Message || "Error in Login");
            // $rootScope.$emit(Events.errorInLogin,{type:Events.eventType.error,data:response});
          }
        },function(err) {
          // $state.go('login');
          $rootScope.$emit(Events.errorInLogin,{type:Events.eventType.error});
        })
      }
      $scope.logout = function() {
          ApiCall.logout({userId:UserService.getUser().userId},function(response) {
            UserService.unsetUser();
            Util.alertMessage("success",response.Message);
            $rootScope.loggedin = false;
            $state.go('login');
          },function(err) {
            Util.alertMessage("danger",err.Message);
          })

      }
      $scope.forgotPassword = function(email) {
          var obj = {
            "userId": 10000,
            "name": "Mukhtar",
            "email": "rajendrasahoodbpb@gmail.com"
          }
          ApiCall.forgotPassword(obj,function(response) {
            Util.alertMessage("success",response.Message);
          },function(err) {
            Util.alertMessage("danger",response.Message);
          })

      }
    })
;
