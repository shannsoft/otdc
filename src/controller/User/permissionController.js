app.controller('PermissionController', function($scope, $rootScope, $state,$timeout,AppModel,$uibModal,ApiCall,Events,Util,$localStorage,UtilityService, Constants) {
  $scope.permissionInit = function(fromAddService) {
    $scope.permission = {};

    // $scope.permission.designation = AppModel.getSetting('designation');
    // $scope.UtilityService = UtilityService;
    $rootScope.showLoader = true;
    ApiCall.getDesignation(function(response) {
      $rootScope.showLoader = false;
      Util.alertMessage(Events.eventType.success,response.Message);
      $scope.permission.designations = response.Data;
      $scope.permission.selectedDesignation = $scope.permission.designations[0];
      // calling for the web service for selected designation
      if(!fromAddService)
        $scope.fetchWebServiceDetails();

    },function(err) {
      $rootScope.showLoader = false;
        Util.alertMessage(Events.eventType.error,err.Message);
    })

  }
  $scope.fetchWebServiceDetails = function() {
    $rootScope.showLoader = true;
    ApiCall.getAuthentication({designation:$scope.permission.selectedDesignation.designationId},function(response) {
      // Util.alertMessage(Events.eventType.success,response.Message);
      $rootScope.showLoader = false;
      $scope.permission.webServices = response;
    },function(err) {
      $rootScope.showLoader = false;
        Util.alertMessage(Events.eventType.error,err.Message);
    })

  }
  $scope.savePermission = function(permission) {
    console.log(permission.webServices == $scope.permission.webServices);
    // permission.actType = 'U';
    var obj = {
      authenticaiton:permission.webServices,
      actType : 'U'
    }
    ApiCall.postAuthentication(obj,function(response) {
      Util.alertMessage(Events.eventType.success,response.Message);
      // $scope.permission.webServices = response;
    },function(err) {
        Util.alertMessage(Events.eventType.error,err.Message);
    })
  }



  /**
  * code for the add permission starts
   */
   $scope.addPermissionInit = function() {
     if(!$scope.permission.designations) {
       $scope.permissionInit(true);
     }
   }
  /**
  * code for the add permission ends
   */

})
