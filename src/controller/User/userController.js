app.controller('UserController', function($scope, $rootScope, $state,$stateParams, $timeout,UserService, UtilityService,Util,$localStorage, Constants,ApiCall,Events) {
    // $scope.UserService = UserService;
    $scope.sideBarTimeout = null;
    function initSideBar(){
      $rootScope.sideBar = UserService.getSideBarInfo();
    }
    $scope.init = function() {
        $scope.user = UserService.getUser();
        // here this is kept in $rootScope as this controller is a shared one
        //the this value getting lost on each controller load
        initSideBar();
        if(!$rootScope.sideBar){
          $scope.sideBarTimeout = $timeout(function() {
            initSideBar();
          }, 2000);
        }
        else {
          $timeout.cancel($scope.sideBarTimeout); // cancel timeout after the sidebar init
        }
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
        // loading user information in case of the edituser, view user
        if($stateParams.userId){
          $scope.isView = $stateParams.action == 'edit' ? false : true;
          var obj = {
            userId:$stateParams.userId,
            TokenId: $localStorage[Constants.getTokenKey()]
          }
          ApiCall.getUser(obj,function(response) {
            $scope.user = response.Data[0];
          },function(err) {
            Util.alertMessage(Events.eventType.error,err.Message);
          })

        }
    }
    $scope.updateActiveClass = function(index){
      angular.forEach($scope.sideBar,function(v,k) {
        if(index == k)
          v.activeClass = 'active';
        else {
            v.activeClass = '';
        }
      })
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


    /**
     * view user starts
     *
     */


    /**
     * view user ends
     *
     */


})
