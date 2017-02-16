app.controller('ProjectMilestoneController', function($scope, $rootScope,$window, $state,$uibModal, $stateParams, ApiCall,Util, EnvService, $timeout, $cookieStore, $localStorage) {
  $scope.projectMilestoneInit = function() {
    $scope.projectMilestone = {};
    if($stateParams.tenderId && $stateParams.tenderList){
      $scope.projectMilestone.tenderList = $stateParams.tenderList;
      //$scope.projectMilestone.tenderList = $rootScope.tenderList;
      var index = getSelectedTenderIndex($stateParams.tenderId,$scope.projectMilestone.tenderList);
      $timeout(function() {
        $scope.projectMilestone.selectedTender = $scope.projectMilestone.tenderList[index];
        ApiCall.getProjectMileStone({tenderId:$scope.projectMilestone.selectedTender.tenderId},function(res) {
          $scope.projectMilestone.milestoneList = res.Data;
          Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
        },function(err) {
          Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
        })
      })
      //$window.location.reload();
    }
    else{
      // call the tender list api and select the first option
      $rootScope.showPreloader = true;
      ApiCall.getTendor(function(res) {
        $rootScope.showPreloader = false;
        $scope.projectMilestone.tenderList = res.Data;
        if($stateParams.tenderId) {
          // select match option with the tender id
          var index = getSelectedTenderIndex($stateParams.tenderId,$scope.projectMilestone.tenderList);
          $scope.projectMilestone.selectedTender = $scope.projectMilestone.tenderList[index];
          // calling to get the Milestone details
          ApiCall.getProjectMileStone({tenderId:$scope.projectMilestone.selectedTender.tenderId},function(res) {
            $scope.projectMilestone.milestoneList = res.Data;
            Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
          },function(err) {
            Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
          })
        }

      }, function(err) {
        Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
        $rootScope.showPreloader = false;
        $state.go("tenderList");
      })
    }
  }
  function getSelectedTenderIndex(tenderId,tenderList) {
    var index = 0;
    for(var i in tenderList) {

      if(tenderList[i].tenderId == tenderId){
        index = i;
        break;
      }
    }
    return index;
  }
  $scope.selectTender = function(selectedTender) {
    ApiCall.getProjectMileStone({tenderId:selectedTender.tenderId},function(res) {
      $scope.projectMilestone.milestoneList = res.Data;
      Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
    },function(err) {
      Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
    })
  }
 $scope.onAction = function(action,milestone) {
   switch (action) {
     case "view":
     case "edit":
      $state.go("projectMilestoneDetails",{tenderId:$scope.projectMilestone.selectedTender.tenderId,milestone:milestone,action:action})
       break;
     case "delete":
     $scope.openMilestoneDeleteModal(milestone);
       break;
     default:

   }
 }

 $scope.openMilestoneDeleteModal = function(milestone) {
   var modalInstance = $uibModal.open({
     animation: true,
     templateUrl: 'deleteMilestoneModal.html',
     controller: 'deleteMilestoneCtrl',
     size: 'md',
     resolve: {
       milestone: function () {
         return milestone;
       }
     }
   });
 }
/**
  add project Milestone details starts
 */
$scope.projectMilestoneDetailsInit = function(){
  $scope.projectMilestoneDetails = {};
    if(!$stateParams.tenderId){
        $state.go("projectMilestone");
      }
      else if($stateParams.tenderId && !$stateParams.milestone ){
        $state.go("projectMilestone",{tenderId:$stateParams.tenderId});
      }
      else{
        $scope.projectMilestoneDetails = $stateParams.milestone;
      }
      $scope.isEdit = $stateParams.action == "edit" ? true : false;


}
$scope.updateMilestone = function(form){
  $scope.projectMilestoneDetails.actType = 'U';
  ApiCall.postProjectMileStone($scope.projectMilestoneDetails,function(res) {
    Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
  },function(err) {
    Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
  })
}
/**
  add project Milestone details ends
 */


/**
 * add project milestone starts
 */
$scope.addProjectMilestoneInit = function() {
  $scope.addProjectMilestone = {};
  if(!$stateParams.tenderId){
    $state.go("projectMilestone");
  }
  else {
    $scope.addProjectMilestone.tenderId = $stateParams.tenderId;
    $scope.addProjectMilestone.actType = "I";
  }
}
$scope.submitProjectMilestone = function(form){
  ApiCall.postProjectMileStone($scope.addProjectMilestone,function(res) {
    Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
  },function(err) {
    Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
  })
}

/**
  add project Milestone ends
 */


});

/**
 * modal controller for the delete milestone
 */1
app.controller('deleteMilestoneCtrl', function ($scope, $state,$uibModalInstance,milestone,Events,ApiCall,Util) {
  // $scope.user = user;
  $scope.ok = function () {
    // calling service to delete user
    var obj = {
      actType:'D',
      code:milestone.code
    }
    // ApiCall.postUser(obj,function(response) {
    //   Util.alertMessage(Events.eventType.success,response.Message);e
    //   $uibModalInstance.close();
    //   $state.reload();
    // },function(err) {
    //   Util.alertMessage(Events.eventType.error,err.Message);
    //   $uibModalInstance.close();
    // })
    ApiCall.postProjectMileStone(obj,function(res) {
      Util.alertMessage(Events.eventType.success,res.Message);
      $uibModalInstance.close();
      $state.reload();
    },function(err) {
      Util.alertMessage(erre.Status.toLocaleLowerCase(),err.Message);
    })

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
