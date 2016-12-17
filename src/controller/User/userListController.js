app.controller('UserListController', function($scope, $rootScope, $state, ApiCall,UserService,Events, UtilityService,Util,$localStorage, Constants) {
    // $scope.UserService = UserService;
    $scope.init = function() {
      $scope.userList = [];
      var obj = {
        TokenId:$localStorage[Constants.getTokenKey()],
        UserId:""
      }
      $rootScope.showPreloader = true;
        ApiCall.getUser(obj,function(response) {
          $scope.userList = response.Data;
          $rootScope.showPreloader = false;
        },
        function(err){
          Util.alertMessage(Events.eventType.error,err.message);
          $rootScope.showPreloader = false;
        }
      )
    }



})
