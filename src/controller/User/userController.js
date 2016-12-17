app.controller('UserController', function($scope, $rootScope, $state, UserService, UtilityService,Util,$localStorage, Constants,ApiCall) {
    // $scope.UserService = UserService;
    $scope.init = function() {
        $scope.user = UserService.getUser();
        // here this is kept in $rootScope as this controller is a shared one
        //the this value getting lost on each controller load
        $rootScope.sideBar = UserService.getSideBarInfo();
        $scope.userTabs = [{
            heading: "View Profile",
            active: true
        }, {
            heading: "Edit Profile",
            active: false
        }, {
            heading: "Change Password",
            active: false
        }, ]
        $scope.currTab = 0;
    }
    $scope.tabChange = function(tabPos) {
        $scope.currTab = tabPos;
    }
    $scope.changePassword = function() {
        var obj = {
            UserId: $scope.user.userId,
            TokenId: $localStorage[Constants.getTokenKey()],
            OldPassword: $scope.user.oldPassword,
            NewPassword: $scope.user.newPassword,
        }
        UtilityService.showLoader();
        UserService.serviceCall().getUser(obj, function(response) {
                UtilityService.hideLoader();
                Util.alertMessage("success", "Password Changed");
            },
            function(error) {
                UtilityService.hideLoader();
                Util.alertMessage("danger", "Password Change Error");
            }
        )
    }
    /**
     * add user starts
     *
     */
     $scope.addUserInit = function() {
       $rootScope.showPreloader = true;
       ApiCall.getDesignation({TokenId:$localStorage[Constants.getTokenKey()]},function(res) {
         $scope.designations = res.Data;
         $rootScope.showPreloader = false;
       },function(err) {
         Util.alertMessage("danger", err.Message || "Error in Login");
         $rootScope.showPreloader = false;
       })
     }
     $scope.addUser = function(form) {
       $scope.user.designationId = $scope.user.designation.designationId;
       delete $scope.user['designation'];
       console.log("user ",$scope.user);
       $scope.user.tokenId = $localStorage[Constants.getTokenKey()];
       ApiCall.postUser($scope.user,function(res) {
         Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
         $state.go("UserList");
       },function(err) {
         Util.alertMessage(res.Status.toLocaleLowerCase(), err.Message || "Error in Login");
       })
     }
    /**
     * add user ends
     *
     */


})
