app.controller('UserDetailsController', function($scope, $rootScope, $state,$stateParams, ApiCall,UserService,Events, UtilityService,Util,$localStorage, Constants) {
    // $scope.UserService = UserService;
    $scope.init = function() {
      $scope.isEdit = $stateParams.action == "edit" ? true : false;

      var obj = {
        TokenId:$localStorage[Constants.getTokenKey()],
        UserId:$stateParams.UserId
      }
      $rootScope.showPreloader = true;
        ApiCall.getUser(obj,function(response) {
          $scope.user = response.Data;
          $rootScope.showPreloader = false;
        },
        function(err){
          Util.alertMessage(Events.eventType.error,err.message);
          $rootScope.showPreloader = false;
        }
      )
    }



})
