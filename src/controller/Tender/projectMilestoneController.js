app.controller('ProjectMilestoneController', function($scope, $rootScope,$window, $state,$uibModal, $stateParams, ApiCall,Util, EnvService, $timeout, $cookieStore, $localStorage) {
  $scope.projectMilestoneInit = function() {
    $scope.projectMilestone = {};
    // if both the tenderId and tender data is present
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
    else if ($stateParams.tenderId && !$stateParams.tenderList) {
      // fetch the tender details and recall the state with tender list and the tender Id
      ApiCall.getTendor(function(res) {
        $rootScope.showPreloader = false;
        $scope.projectMilestone.tenderList = res.Data;
        $state.go($state.current, {tenderId:$stateParams.tenderId,tenderList:$scope.projectMilestone.tenderList}, {reload: true});
        // $state.go("projectMilestone",{tenderId:$stateParams.tenderId,tenderList:$scope.projectMilestone.tenderList})
      },function(err) {
        Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
      })
    }
    else{
      // call the tender list api
      $rootScope.showPreloader = true;
      ApiCall.getTendor(function(res) {
        $rootScope.showPreloader = false;
        $scope.projectMilestone.tenderList = res.Data;
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
    // reload the state with new data
    $state.go($state.current, {tenderId:selectedTender.tenderId,tenderList:$scope.projectMilestone.tenderList}, {reload: true});

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
     case "review":
      $state.go("projectMilestoneReview",{tender:$scope.projectMilestone.selectedTender,tenderId:$scope.projectMilestone.selectedTender.tenderId,milestoneId:milestone.code})
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
 * ProjectMilestoneReviewController starts
 */
 app.controller('ProjectMilestoneReviewController', function ($rootScope,$scope, $state,$stateParams,ApiCall,Util,Events) {
   $scope.projectMilestoneReviewInit = function() {
     $scope.projectMilestoneReview = {};
     $scope.projectMilestoneReview.toggleTender = false;
     $scope.projectMilestoneReview.status = "delayed";
     if(!$stateParams.tenderId)
      {
        Util.alertMessage(Events.eventType.warning,Events.pleaseSelectTender);
        $state.go("projectMilestone");
        return;
      }
     else if(!$stateParams.milestoneId)
      {
        Util.alertMessage(Events.eventType.warning,Events.pleaseSelectMilestone);
        $stateParams.tenderId ? $state.go("projectMilestone",{tenderId:$stateParams.tenderId}) : $state.go("projectMilestone");
        return;
      }
      if($stateParams.tender)
        $scope.projectMilestoneReview.selectedTender = $stateParams.tender;
   }
   $scope.toggleTenderDetails = function() {
     $scope.projectMilestoneReview.toggleTender = !$scope.projectMilestoneReview.toggleTender;
     if($scope.projectMilestoneReview.toggleTender && !$scope.projectMilestoneReview.selectedTender) {
       // fetche the tender details
       $rootScope.showPreloader = true;
       ApiCall.getTendor({tenderId:$stateParams.tenderId},function(res) {
         $rootScope.showPreloader = false;
         $scope.projectMilestoneReview.selectedTender = res.Data;
       },function(err) {
         Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
       })
     }
   }
   $scope.saveReview = function(form) {
     console.log($scope.projectMilestoneReview);
     console.log(form);
   }
 });

/**
 * ProjectMilestoneReviewController starts
 */



/**
 * modal controller for the delete milestone
 */
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
