app.controller('UserListController', function($scope, $rootScope, $state, UserService,Events, UtilityService,Util,$localStorage, Constants) {
    // $scope.UserService = UserService;
    $scope.init = function() {
      $scope.userList = [];
      var obj = {
        TokenId:$localStorage[Constants.getTokenKey()]
      }
        UserService.serviceCall().getUsers(obj,function(response) {
          $scope.userList = response.Data;
        },
        function(err){
          Util.alertMessage(Events.eventType.error,err.message);
        }
      )
    }



})
