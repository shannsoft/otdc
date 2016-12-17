app.controller('VendorController',function($scope,$rootScope,$state,Constants,EnvService,$timeout,$cookieStore,$localStorage,ApiCall,Util){
  /***************************************************************************/
  /**************************This is use to show a pop up****************************/
  /***************************************************************************/
  $scope.onDeleteVendor = function (vendor) {

    $scope.selectedVendor = vendor;
    $scope.open();
  };
  $scope.open = function(){
      $scope.showModal = true;
  }
  /***************************************************************************/
  /**************************This is use to hide a pop up****************************/
  /***************************************************************************/
  $scope.ok = function () {
    console.log("vendor to be deleted",$scope.selectedVendor);
    var vendorData = {};
    vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.vendorId = $scope.selectedVendor.vendorId;
    $rootScope.showPreloader = true;
    ApiCall.deleteVendor(vendorData,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      $scope.initVenderList();
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
    $scope.showModal = false;
    $scope.selectedVendor = null;
  };
  /***************************************************************************/
  /**************************This is use to hide a pop up****************************/
  /***************************************************************************/
  $scope.cancel = function () {
    console.log("vendor to be deleted cancelled ",$scope.selectedVendor);
    $scope.selectedVendor = null;
     $scope.showModal = false;
  };
  /***************************************************************************/
  /**************************This is use to go to edit vendor page****************************/
  /***************************************************************************/
  $scope.gotoEditVendor = function(vendor){
    $state.go('editVendor',{vendor:vendor});
  }
  $scope.initVenderList = function(){
    var vendorData = {};
    vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.type = "GET_VENDOR_ALL";
    $rootScope.showPreloader = true;
    ApiCall.getVendor(vendorData,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      $scope.vendors = res.Data;
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
  }
  $scope.addVendor = function(addVendorForm,vendorData){

    vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.type = "I";
    $rootScope.showPreloader = true;
    ApiCall.postVendor(vendorData,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      $state.go("VendorList");
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
  }
})
