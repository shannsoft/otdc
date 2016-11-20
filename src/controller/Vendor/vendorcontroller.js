app.controller('Vendor_controller',function($scope,$rootScope,$state,EnvService,$timeout,$cookieStore,$localStorage){
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
})