app.controller('Main_Controller',function($scope,$rootScope,$state,EnvService,$timeout,$cookieStore,$localStorage,validationService,Events){
  // Events handling
  $rootScope.$on(Events.validationFieldMissing,function(event,data) {
    alert("Event handled",data);
  });

  $scope.init = function(){
    console.log(11111);
    var temp = validationService.getValidationMessage("required","type1","username");
  }
  // $rootScope.is_loggedin = false;
  // $scope.signOut = function() {
  //   $rootScope.loggedin = false;
  //   // delete $localStorage[Constants.getTokenKey()]
  //   // $state.go("signIn");
  // }
  /***************************************************************************/
  /**************************This is use for login****************************/
  /***************************************************************************/
  // $scope.login = function() {
  //   $state.go('dashboard');
  // }
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
