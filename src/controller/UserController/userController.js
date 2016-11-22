app.controller('UserController',function($scope,$rootScope,$state,EnvService,$timeout,$cookieStore,$localStorage){
  $scope.showModal = false;
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
  /**************************This is use to go edituser page****************************/
  /***************************************************************************/
  $scope.gotoEditUser = function(){
    $state.go('editUser');
  }
})
