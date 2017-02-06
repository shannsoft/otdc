app.controller('RoleListController', function($scope, $rootScope, $state, ApiCall,$uibModal, AppModel,EnvService, $timeout, $cookieStore, $localStorage,NgTableParams) {
  $scope.init = function() {
    $scope.roles = {};
    ApiCall.getDesignation(function(response) {
      $rootScope.showPreloader = false;
      $scope.roles.designation = response.Data;
    },function(err) {
      $rootScope.showPreloader = false;
      Util.alertMessage(Events.eventType.error,err.Message);
    })
    // if(AppModel.getSetting()) {
    //   $timeout.cancel($scope.timeout); // cancel timeout if exist
    //   $scope.roles.designation = AppModel.getSetting('designation');
    // }
    // else {
    //     $scope.timeout = $timeout(function() {
    //     $scope.init();
    //   }, 2000);
    // }
  }
 $scope.onAction = function(action,designation) {
   var templateUrl;
   switch (action) {
     case 'view':
       templateUrl = 'designationView.html';
     case 'add':
       templateUrl = 'designationAdd.html';
       designation = {} ; // incase of add init blank object
       break;
     case 'edit':
      templateUrl = 'designationEdit.html';
       break;
     case 'delete':
      templateUrl = 'designationDelete.html';
       break;
     default:

   }
   var modalInstance = $uibModal.open({
     animation: true,
     templateUrl: templateUrl,
     controller: 'designationModalCtrl',
     size: 'lg',
     resolve: {
       action: function () {
         return action;
       },
       designation: function () {
         return designation;
       }
     }
   });
 }
});

app.controller('designationModalCtrl', function ($rootScope,$scope, $uibModalInstance,Util,ApiCall,$state,Events,action,designation ) {
  $scope.action = action;
  $scope.designation = designation;
  $scope.ok = function () {
    var obj = {};
    // calling service to delete user
    switch ($scope.action) {
      case 'view':
       $scope.designation.actType = 'V';
        break;
      case 'add':
       $scope.designation.actType = 'I';
        break;
      case 'edit':
        $scope.designation.actType = 'U';

        break;
      case 'delete':
          $scope.designation.actType = 'D';

        break;
      default:

    }
    // obj = Object.assign(obj, $scope.designation);
    $rootScope.showPreloader = true;
    ApiCall.postDesignation($scope.designation,function(response) {
      $rootScope.showPreloader = false;
      Util.alertMessage(Events.eventType.success,response.Message);
      $state.reload();
      $uibModalInstance.close();
    },function(err) {
      $rootScope.showPreloader = false;
      Util.alertMessage(Events.eventType.error,err.Message);
      $uibModalInstance.close();
    })

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
