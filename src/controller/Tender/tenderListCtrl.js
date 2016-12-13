app.controller('TenderListController', function($scope, $rootScope, $state, ApiCall, EnvService, $timeout, $cookieStore, $localStorage) {

    $scope.tenderListInit = function() {
      ApiCall.getTendor(function(res) {

        $scope.tenders = res.Data;
        // Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
      }, function(err) {
        Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
      })
    }
    $scope.onAction = function(action,tender) {
      $state.go("tenderDetails",{tenderId:tender.tenderId,action:action});
    }
})
