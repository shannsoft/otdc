app.controller('UserDetailsController', function($scope, $rootScope, $state,$stateParams, AppModel,ApiCall,UserService,Events, UtilityService,Util,$localStorage, Constants) {
    // $scope.UserService = UserService;
    $scope.init = function() {
      $scope.isEdit = $stateParams.action == "edit" ? true : false;
      // get the designation to update
      if($scope.isEdit){
        if(!AppModel.getSetting()) {
          $scope.timeout = $timeout(function() {
            $scope.init();
          }, 2000);
        }
        else {
          $timeout.cancel($scope.timeout);
          $scope.designations = AppModel.getSetting('designation');
        }
      }
      var obj = {
        TokenId:$localStorage[Constants.getTokenKey()],
        UserId:$stateParams.userId
      }
      $rootScope.showPreloader = true;
        ApiCall.getUser(obj,function(response) {
          $scope.user = response.Data;
          $rootScope.showPreloader = false;
          // setting the user designation
          for(var i in $scope.designations){
            if($scope.user.designation == $scope.designations[i].designationName){
              $scope.user.designation = $scope.designations[i];
            }
          }
        },
        function(err){
          Util.alertMessage(Events.eventType.error,err.message);
          $rootScope.showPreloader = false;
        }
      )
    }
    // update user info as admin
    $scope.updateUser = function(form,user) {
      user.designationId = user.designation.designationId;
      delete user['designation'];
      user.actType = 'U';
      ApiCall.postUser(user,function(res) {
        Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
        $state.go("UserList");
      },function(err) {
        Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message || "Error in Login");
      })
    }


})
