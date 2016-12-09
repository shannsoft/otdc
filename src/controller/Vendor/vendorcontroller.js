app.controller('VendorController',function($scope,$rootScope,$state,Constants,EnvService,$timeout,$cookieStore,$localStorage,ApiCall,Util){
  /***************************************************************************/
  /**************************This is use to show a pop up****************************/
  /***************************************************************************/
  $scope.open = function () {
    $scope.showModal = true;
  };
  /***************************************************************************/
  /**************************This is use to hide a pop up****************************/
  /***************************************************************************/
  $scope.ok = function () {
    $scope.showModal = false;
  };
  /***************************************************************************/
  /**************************This is use to hide a pop up****************************/
  /***************************************************************************/
  $scope.cancel = function () {
     $scope.showModal = false;
  };
  /***************************************************************************/
  /**************************This is use to go to edit vendor page****************************/
  /***************************************************************************/
  $scope.gotoEditVendor = function(){
    $state.go('editVendor');
  }
  $scope.initVenderList = function(){

  }
  $scope.addVendor = function(addVendorForm,vendorData){
    console.log("sfsdsdfsdsfsdsdf");
    vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.type = "I";
    ApiCall.postVendor(vendorData,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
    })
  }
})
