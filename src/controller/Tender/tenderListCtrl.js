app.controller('TenderListController', function($scope, $rootScope, $state, ApiCall, EnvService, $timeout, $cookieStore, $localStorage,NgTableParams) {

    $scope.tenderListInit = function() {
      $rootScope.showPreloader = true;
      ApiCall.getTendor(function(res) {

        //$scope.tenders = res.Data;
        $scope.tableParams = new NgTableParams();
        $scope.tableParams.settings({
        dataset: res.Data
      });
        // Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
        $rootScope.showPreloader = false;
      }, function(err) {
        Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
        $rootScope.showPreloader = false;
      })
    }
    $scope.onAction = function(action,tender) {

      switch (action) {
        case 'assign':
          $state.go("tenderAssign",{tender:tender});
          break;
        case 'view':
        case 'edit':
          $state.go("tenderDetails",{tenderId:tender.tenderId,action:action});
          break;
        case 'freeze':
        
          break;
        default:

      }

    }
})
