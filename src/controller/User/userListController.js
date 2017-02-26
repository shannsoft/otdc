app.controller('UserListController', function($scope, $rootScope, $state, NgTableParams,$uibModal,ApiCall,UserService,Events, UtilityService,Util,$localStorage, Constants) {
    // $scope.UserService = UserService;
    $scope.init = function() {
      $scope.userList = [];
      var obj = {
        //TokenId:$localStorage[Constants.getTokenKey()],
        UserId:""
      }
      $rootScope.showPreloader = true;
        ApiCall.getUser(obj,function(response) {
          //$scope.userList = response.Data;
          $rootScope.showPreloader = false;
          $scope.tableParams = new NgTableParams();
          $scope.tableParams.settings({
          dataset: response.Data
        });
        },
        function(err){
          Util.alertMessage(Events.eventType.error,err.Message);
          $rootScope.showPreloader = false;
        }
      )
    }
    $scope.getUserDetails = function(data) {
      $state.go("userDetails",data);
    }
    $scope.openDeleteModal = function(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'deleteModal.html',
        controller: 'deleteModalCtrl',
        size: 'md',
        resolve: {
          user: function () {
            return user;
          }
        }
      });
    }


})

app.controller('deleteModalCtrl', function ($scope, $uibModalInstance,user,Util,ApiCall,$state,Events ) {
  $scope.user = user;
  $scope.ok = function () {
    // calling service to delete user
    var obj = {
      actType:'D',
      userId:user.userId
    }
    ApiCall.postUser(obj,function(response) {
      Util.alertMessage(Events.eventType.success,response.Message);
      $uibModalInstance.close();
      $state.reload();
    },function(err) {
      Util.alertMessage(Events.eventType.error,err.Message);
      $uibModalInstance.close();
    })

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
