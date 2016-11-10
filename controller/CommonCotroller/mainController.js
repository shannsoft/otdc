app.controller('Main_Controller',function($scope,$rootScope,$state,MainService,$timeout,$cookieStore,$localStorage){
  $scope.init = function(){
    // $scope.$on('$viewContentLoaded',function(event) {
    //   $(document).trigger("TemplateLoaded");
    // });
    console.log(11111);
  }
  $rootScope.is_loggedin = true;
  // $scope.signOut = function() {
  //   $rootScope.loggedin = false;
  //   // delete $localStorage[Constants.getTokenKey()]
  //   // $state.go("signIn");
  // }
  /***************************************************************************/
  /**************************This is use for login****************************/
  /***************************************************************************/
  $scope.login = function() {
    $state.go('dashboard');
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
 $scope.forgetpassword = function(){
   $state.go('forget_password');
 }
})
