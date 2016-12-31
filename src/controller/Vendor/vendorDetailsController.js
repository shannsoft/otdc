app.controller('VendorDetailsController',function($scope,$rootScope,$state,$stateParams,Constants,EnvService,$timeout,$cookieStore,$localStorage,ApiCall,Util){
  $scope.init = function() {
    if(!$stateParams.vendor)
      $state.go("VendorList"); // move to vendor list if no vendor selected to edit data
    else {
      $scope.isEdit = $stateParams.action == 'edit' ? true : false;
      $scope.vendor = $stateParams.vendor;
    }
  }
  $scope.updateVendor = function(vendorDetails,vendor) {
    console.log(vendorDetails,vendor);
    vendor.actType = "U";
    $rootScope.showPreloader = true;
    ApiCall.postVendor(vendor,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      $state.go("VendorList");
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
  }
})
