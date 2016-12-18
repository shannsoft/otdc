app.controller('TenderAssignController', function($scope, $rootScope, $state, $stateParams, ApiCall, EnvService, $timeout, $cookieStore, $localStorage,Constants,Util) {
  $scope.init = function() {
    if(!$stateParams.tender)
    {
      $state.go("tenderList");
      return;
    }
    $scope.isView = true;
    $scope.tender = $stateParams.tender;
    // loading vendorList
    $rootScope.showPreloader = true;
    var vendorData = {};
    vendorData.tokenId = $localStorage[Constants.getTokenKey()];
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
    var obj = {
      vendorId    : tender.vendor.vendorId,
      tenderId    : tender.tenderId,
      type        : "I"
    }
    ApiCall.tendorAssign(obj,function(response) {
      $state.go("tenderList");
      Util.alertMessage(response.Status.toLocaleLowerCase(), response.Message);
    }, function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
    })
  }
})
