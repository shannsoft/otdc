app.controller('ConfugrationsController', function($scope, $rootScope, $window, Events, $state, $uibModal, $stateParams, $filter, ApiCall, Util, $timeout, $localStorage, UtilityService, Constants) {
    $scope.confugrationInit = function() {
        // $scope.tabs = [{
        //         heading: "Tender",
        //         active: true
        //     },
        //     {
        //             heading: "Billing",
        //             active: false
        //     },
        // ]
        $scope.currTab = 0;
        $scope.configuration = {
            tender: {},
            billing: {},
        }
    }
    $scope.tabChange = function(tabPos) {
        $scope.currTab = tabPos;
    }
    $scope.saveConfugration = function(tabIndex) {

      switch (tabIndex) {
        case 0: // tender
           // api call to save tender details
           if(!$scope.configuration.tender.serviceTax) {
             Util.alertMessage("warning","Please Enter Service tax");
             return;
           }
           if(!$scope.configuration.tender.incomeTax) {
             Util.alertMessage("warning","Please Enter Income tax");
             return;
           }

           ApiCall.postConfigurations($scope.configuration.tender,function(response) {
             $rootScope.showPreloader = false;
             Util.alertMessage(Events.eventType.success,response.Message);

           },function(err) {
             $rootScope.showPreloader = false;
             Util.alertMessage(Events.eventType.error,err.Message);

           })
          break;
        case 1:
          // billing configurations
          ApiCall.postBillingAuth($scope.designations,function(response) {
            $rootScope.showPreloader = false;
            Util.alertMessage(Events.eventType.success,response.Message);

          },function(err) {
            $rootScope.showPreloader = false;
            Util.alertMessage(Events.eventType.error,err.Message);

          })
          break;
        case 1:

          break;
        default:

      }
    }

    /**
     * Billing configuration starts
     */
     $scope.billingConfigInit = function() {
       ApiCall.getDesignation(function(response) {
         $rootScope.showPreloader = false;
         $scope.designations = response.Data;
       },function(err) {
         $rootScope.showPreloader = false;
         Util.alertMessage(Events.eventType.error,err.Message);
       })
     }

    /**
     * Billing configuration ends
     */
});
