app.controller('VendorChecklistController',function($scope,$rootScope,$state,$stateParams,Constants,Events,EnvService,$timeout,$cookieStore,$localStorage,ApiCall,Util){
  $scope.currTab = 0;
  $scope.init = function() {
    Util.alertMessage(Events.eventType.warning,Events.noVendorSelected);
    if(!$stateParams.vendorId) {
      $state.go("VendorList");
    }
    else {
      $scope.vendorChecklist.vendorId = $stateParams.vendorId;

    }
  }
  $scope.tabChange = function(tabPos) {
      $scope.currTab = tabPos;
  }

})
