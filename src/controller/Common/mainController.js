app.controller('Main_Controller',function($scope,$rootScope,$state,EnvService,$timeout,$cookieStore,$localStorage,validationService,Events,$location,Util,$anchorScroll){
  // Events handling
  $rootScope.$on(Events.validationFieldMissing,function(event,data) {
    alert("Event handled",data);
  });
  $rootScope.$on(Events.errorInLogin,function(event,data){
      $location.hash('top');
      $anchorScroll();
        console.log("alert data  ",data.type, data.message || Events.errorInLogout);
      Util.alertMessage(data.type, data.message || Events.errorInLogin);
  })
  $rootScope.$on(Events.errorInLogout,function(event,data){
      $location.hash('top');
      $anchorScroll();
      console.log("alert data  ",data.type, data.message || Events.errorInLogout);
      Util.alertMessage(data.type, data.message || Events.errorInLogout);
  })


  $scope.init = function(){
    
  }
  // $rootScope.loggedin = false;
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
