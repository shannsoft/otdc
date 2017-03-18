app.controller('ConfugrationsController', function($scope, $rootScope, $window, Events, $state, $uibModal, $stateParams, $filter, ApiCall, Util, $timeout, $localStorage, UtilityService, Constants) {
    $scope.confugrationInit = function() {
        $scope.tabs = [{
                heading: "Tender",
                active: true
            },
        ]
        $scope.currTab = 0;
        $scope.confugrations = {
            tender: {
                // will be updated after the service call for the confugration data
            }
        }
    }
    $scope.tabChange = function(tabPos) {
        $scope.currTab = tabPos;
    }
    $scope.saveConfugration = function(tabIndex) {
      switch (tabIndex) {
        case 0: // tender
           // api call to save tender details
          break;
        case 1:

          break;
        case 1:

          break;
        default:

      }
    }
});
