app.controller('User_Controller',function($scope,$rootScope,$state,MainService,$timeout,$cookieStore,$localStorage){
  $scope.init = function(){
    $scope.$on('$viewContentLoaded',function(event) {
      $(document).trigger("TemplateLoaded");
    });
  }
  $scope.showModal = false;
  $rootScope.is_loggedin = true;
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
  $scope.gotoEditUser = function(){
    $state.go('editUserDetails');
  }
})
