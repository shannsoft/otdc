app.controller('Main_Controller',function($scope,$rootScope,$state,MainService,$timeout,$cookieStore,$localStorage){
  $scope.init = function(){
    $scope.$on('$viewContentLoaded',function(event) {
      $(document).trigger("TemplateLoaded");
    });
  }
  /***************************************************************************/
  /**************************This is use for login****************************/
  /***************************************************************************/
  $scope.login = function() {

  }
  /*******************************************************/
  /*************This is use for check user login**********/
  /*******************************************************/
  $scope.getUserDetails = function(){
  }
 /*******************************************************/
 /*************This is use for  user logout**************/
 /*******************************************************/
 $scope.signOut = function(){
 }
})
