app.controller('PermissionController', function($scope, $rootScope, $state,$timeout,AppModel,$uibModal,ApiCall,Events,Util,$localStorage,UtilityService, Constants) {
  $scope.init = function() {
    $scope.permission = {};

    $scope.permission.designation = AppModel.getSetting('designation');
    $scope.UtilityService = UtilityService;
    if(!$scope.permission.designation)
    {
      $scope.permission.timeout = $timeout(function(){
        $scope.init()
      },2000);
    }
    else{
      $timeout.cancel($scope.permission.timeout);
      $scope.permission.currTab = 0;
      $scope.permission.designation.isActive = true;
    }
  }
  $scope.tabChange = function(designation,index) {
    $scope.permission.currTab = index;
  }
})
