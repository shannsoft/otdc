app.controller('UserController',function($scope,$rootScope,$state,UserService,$localStorage,Constants){
  // $scope.UserService = UserService;
  $scope.init = function(){
    $scope.user = UserService.getUser();
    $scope.userTabs = [
      {heading:"View Profile",active:true},
      {heading:"Edit Profile",active:false},
      {heading:"Change Password",active:false},
    ]
    $scope.tabChange = function(tabPos){
      for(var i in $scope.userTabs) {
        $scope.userTabs.active = false;
      }
      $scope.userTabs[tabPos].active = true;
    }
    $scope.changePassword = function(){
      var obj = {
        UserId:$scope.user.userId,
        TokenId:$localStorage[Constants.getTokenKey()],
        OldPassword:$scope.user.oldPassword,
        NewPassword:$scope.user.newPassword,
      }
      UserService.serviceCall().getUser(obj,function(response) {
          console.log("Password change success");
        },
        function(error) {
            console.error("Password change failed");
        }
      )
    }
  }

})
