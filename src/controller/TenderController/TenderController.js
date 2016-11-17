app.controller('Tender_controller',function($scope,$rootScope,$state,EnvService,$timeout,$cookieStore,$localStorage){
$scope.goTenderAssign = function(){
  $state.go('tender_assign');
}
$scope.gotoTenderCheck = function(){
  $state.go('tender_checklist');
}
})
