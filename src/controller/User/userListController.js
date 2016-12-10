app.controller('UserListController', function($scope, $rootScope, $state, ApiCall,UserService,Events, UtilityService,Util,$localStorage, Constants) {
    // $scope.UserService = UserService;
    $scope.init = function() {
      $scope.userList = [];
      var obj = {
        Token:$localStorage[Constants.getTokenKey()],
        UserId:""
      }
        ApiCall.getUser(obj,function(response) {
          $scope.userList = response.Data;
        },
        function(err){
          Util.alertMessage(Events.eventType.error,err.message);
        }
      )
    }



})
