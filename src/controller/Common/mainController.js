app.controller('Main_Controller',function($scope,$rootScope,$state,EnvService,$timeout,$cookieStore,$localStorage,validationService,Events,$location,Util,$anchorScroll){
  // Events handling
  $rootScope.$on(Events.validationFieldMissing,function(event,data) {
    alert("Event handled",data);
  });

  $rootScope.$on(Events.errorInLogin,function(event,data){
      $location.hash('top');
      $anchorScroll();
      Util.alertMessage(data.type, data.message || Events.errorInLogin);
  })
  $rootScope.$on(Events.errorInLogout,function(event,data){
      $location.hash('top');
      $anchorScroll();
      Util.alertMessage(data.type, data.message || Events.errorInLogout);
  })


  // Event hander for the error type message
  $rootScope.$on(Events.eventType.error,function(event,data){
      $location.hash('top');
      $anchorScroll();
      Util.alertMessage(Events.eventType.error, data.message);
  })
  // Event hander for the warning type message
  $rootScope.$on(Events.eventType.warn,function(event,data){
      $location.hash('top');
      $anchorScroll();
      Util.alertMessage(Events.eventType.warn, data.message);
  })
  // Event hander for the success type message
  $rootScope.$on(Events.eventType.success,function(event,data){
      $location.hash('top');
      $anchorScroll();
      Util.alertMessage(Events.eventType.success, data.message);
  })
 // used to close the alert
 $scope.close = function(){
     $rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
 }
 $scope.forgetpassword = function(){
   $state.go('forget_password');
 }
})
