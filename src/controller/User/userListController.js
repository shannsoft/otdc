app.controller('UserListController', function($scope, $rootScope, $state,NgTableParams, ApiCall,UserService,Events, UtilityService,Util,$localStorage, Constants) {
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
          $scope.tableParams = new NgTableParams();
            $scope.tableParams.settings({
            dataset: response.Data,
            // filterData: $scope.tenderTypes
          });
        },
        function(err){
          Util.alertMessage(Events.eventType.error,err.message);
          $rootScope.showPreloader = false;
        }
      )
    }
    $scope.getUserDetails = function(data) {
      $state.go('userDetails',data);
    }


})
