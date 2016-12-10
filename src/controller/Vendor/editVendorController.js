app.controller('EditVendorController',function($scope,$rootScope,$state,$stateParams,Constants,EnvService,$timeout,$cookieStore,$localStorage,ApiCall,Util){
  $scope.initEditVendor = function() {
    if(!$stateParams.vendor)
      $state.go("VendorList"); // move to vendor list if no vendor selected to edit data
    else {
      $scope.vendor = $stateParams.vendor;
    }
  }
  $scope.updateVendor = function(vendorDetails,vendor) {
    console.log(vendorDetails,vendor);
  }
})
