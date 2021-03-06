app.controller('AddTendorController',function($scope,$rootScope,$state,Util,Constants,ApiCall,EnvService,$timeout,$cookieStore,$localStorage,AppModel){

$scope.addTendorInit = function() {
  $scope.tender = {};
  $scope.tender.FileData = {};
  $scope.fileData = {};
  $scope.tender.genTechEvlnAllow = "Yes";
  $scope.tender.isMultyCurrency = "Yes";
  $scope.tender.itemTechEvlnAllow = "Yes";
  $scope.tender.isMultyCurrencyBOQ = "Yes";
  $scope.tender.emdExempAllow = "Yes";
  if(!AppModel.getSetting()) {
    $scope.timeout = $timeout(function() {
      $scope.addTendorInit();
    }, 2000);
  }
  else {
    $timeout.cancel($scope.timeout)
    $scope.tender.tenderTypes = AppModel.getSetting('tenderType');
    $scope.tender.tenderType = $scope.tender.tenderTypes[0] // default value
  }
}
/* $scope.fileSelected = function(fileName) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>",window.fileData);
  $scope.tender.FileData = window.fileData;
} */
$scope.addTendor = function(addTendorForm,tender) {
  // tender.tokenID = $localStorage[Constants.getTokenKey()];
  tender.actType = "I";
  tender.tenderType = tender.tenderType.typeName;
  console.log(JSON.stringify(tender));
  $rootScope.showPreloader = true;
  ApiCall.postTendor(tender,function(res) {
    Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
    $rootScope.showPreloader = false;
    $state.go("tenderList");
  }, function(err) {
    $rootScope.showPreloader = false;
    Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
  })
}
$scope.goTenderAssign = function(){
  $state.go('tender_assign');
}
$scope.gotoTenderCheck = function(){
  $state.go('tender_checklist');
}

})
