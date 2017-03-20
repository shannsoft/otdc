app.controller('TenderAssignController', function($scope, $rootScope, $state, $stateParams, ApiCall, EnvService, $timeout, $cookieStore, $localStorage,Constants,Util) {
  $scope.init = function() {
    if(!$stateParams.tender)
      $state.go("tenderList");
    $scope.isView = true;
    $scope.tender = $stateParams.tender;
    // loading vendorList
    $rootScope.showPreloader = true;
    var vendorData = {};
    // vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.type = "GET_VENDOR_ALL";
    ApiCall.getVendor(vendorData,function(res) {
      $scope.tender.vendors = res.Data;
      $rootScope.showPreloader = false;
    },function(err) {
      $rootScope.showPreloader = false;
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
    })
  }
  $scope.assignTender = function(tenderAssignForm,tender) {
    console.log(tenderAssignForm,JSON.stringify(tender));

    var obj = {
      actType:"I",
      tenderId:tender.tenderId,
      vendorId:tender.vendor.vendorId,
    }
    ApiCall.postTenderAssign(obj,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      $state.go("tenderList");
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
    })
  }
})
