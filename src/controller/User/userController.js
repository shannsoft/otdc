app.controller('UserController', function($scope, $rootScope, $state,$stateParams, UserService,AppModel,$window, UtilityService,Util,$localStorage, Constants,ApiCall,Events) {
    // $scope.UserService = UserService;
    $rootScope.$on(Events.userLogged,function() {
      if(!$scope.user){
        $scope.user = UserService.getUser();
      }
    });
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
        // loading user information in case of the edituser, view user
        if($stateParams.userId){
          $scope.isView = $stateParams.action == 'edit' ? false : true;
          var obj = {
            userId:$stateParams.userId,
            // TokenId: $localStorage[Constants.getTokenKey()]
          }
          ApiCall.getUser(obj,function(response) {
            $scope.user = response.Data[0];
          },function(err) {
            Util.alertMessage(Events.eventType.error,err.Message);
          })

        }
    }
    $rootScope.$on(Events.updateSideBar,function(event,data) {
      // get the index of the sideBar to be activeated after state change
      $scope.updateActiveClass(null,data.state);
    })
    $scope.updateActiveClass = function(index,state){
      if(state == "generateBilling") {
        state = "billing" ; // to active the billing tab in side menu incase of generateBilling state change
      }
      angular.forEach($scope.sideBar,function(v,k) {
        if(index == k || state == v.state)
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
            oldPwd: $scope.user.oldPwd,
            newPwd: $scope.user.newPwd,
        }
        UtilityService.showLoader();
        ApiCall.changePassword(obj, function(response) {
                UtilityService.hideLoader();
                Util.alertMessage("success", "Password Changed");
                $state.go("dashboard");
            },
            function(error) {
                UtilityService.hideLoader();
                Util.alertMessage("danger", "Password Change Error");
            }
        )
    }
    $scope.updateDetails = function(form,user) {
      console.log(form,user);
        UtilityService.showLoader();
        user.actType="U";
        ApiCall.postUser(user, function(response) {
                UtilityService.hideLoader();
                Util.alertMessage("success", response.Message);
                $window.location.reload();
            },
            function(error) {
                UtilityService.hideLoader();
                Util.alertMessage("danger", error.Message);
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
       $scope.user.actType = "I";
       $scope.user.designationId = $scope.user.designation.designationId;
      //  delete $scope.user['designation'];
       console.log("user ",$scope.user);
      //  $scope.user.tokenId = $localStorage[Constants.getTokenKey()];
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
     * dashboard code starts
     *
     */
     $scope.initDashboard = function(){
       $scope.dashboard = {};
       ApiCall.getDashboard(function(res) {
         Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
         $scope.dashboard = res.Data;
         $scope.dashboard.tenderStatusCount = {};
         // getting tender status count to show in dashboard tabs
         for(var i in $scope.dashboard.projectMilestone) {
           if($scope.dashboard.projectMilestone[i].projectMilestoneSts == "inTime"){
             $scope.dashboard.tenderStatusCount.inTime = $scope.dashboard.projectMilestone[i].count;
           }
           else if($scope.dashboard.projectMilestone[i].projectMilestoneSts == "delayed"){
             $scope.dashboard.tenderStatusCount.delayed = $scope.dashboard.projectMilestone[i].count;
           }
           else if($scope.dashboard.projectMilestone[i].projectMilestoneSts == "completed"){
             $scope.dashboard.tenderStatusCount.completed = $scope.dashboard.projectMilestone[i].count;
           }
         }
       },function(err) {
         Util.alertMessage(err.Status.toLocaleLowerCase(), res.Message);
       })
     }
     $scope.getTenderByStatus = function(tenderStatus) {
       $state.go("tenderList",{tenderStatus:tenderStatus});
     }
    /**
     * dashboard code ends
     *
     */


})
