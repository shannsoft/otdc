app.controller('ConfugrationsController', function($scope, $rootScope, $window, Events, $state, $uibModal, $stateParams, $filter, UserService,ApiCall, Util, $timeout, $localStorage, UtilityService, Constants) {
    $scope.UserService = UserService;
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
            tax: {},
            billing: {},
        }
        // api call to get the tax confugrations
        ApiCall.getTaxConfig(function(response) {
          $rootScope.showPreloader = false;
          Util.alertMessage(Events.eventType.success,response.Message);
          $scope.configuration.tax = response.Data;
        },function(err) {
          $rootScope.showPreloader = false;
          Util.alertMessage(Events.eventType.error,err.Message);

        })
    }
    $scope.tabChange = function(tabPos) {
        $scope.currTab = tabPos;
    }
    $scope.saveConfugration = function(tabIndex) {

      switch (tabIndex) {
        case 0: // tender
           // api call to save tender details
           if(!$scope.configuration.tax.serviceTax) {
             Util.alertMessage("warning","Please Enter Service tax");
             return;
           }
           if(!$scope.configuration.tax.salesTax) {
             Util.alertMessage("warning","Please Enter Sales tax");
             return;
           }
           $scope.configuration.tax.actType = 'U';
           ApiCall.postTaxConfig($scope.configuration.tax,function(response) {
             $rootScope.showPreloader = false;
             Util.alertMessage(Events.eventType.success,response.Message);

           },function(err) {
             $rootScope.showPreloader = false;
             Util.alertMessage(Events.eventType.error,err.Message);

           })
          break;
        case 1:
          // validate the billing amount based on the designation
          var status = $scope.validateApproveLimit($scope.designations);
          if(!status)
          return; // invalid limit set
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
     $scope.validateApproveLimit = function(designations){
       var status = true;
       var skipDesignation = ['SUPER ADMIN','Assistant Engineer Accounts','Financial Controler'] ; // these designations are not concerned for the billing limit
       var findParent = function(parentId) {
         var parent = null;
         for(var i in designations){
           if(designations[i].designationId == parentId){
             parent = designations[i];
             break;
           }
         }
         return parent;
       }
       for(var i in designations){
         if(skipDesignation.indexOf(designations[i].designationName) == -1){
           var parent = findParent(designations[i].parentId);
           if( (parent && parent.limit < designations[i].limit && skipDesignation.indexOf(parent.designationName) == -1)){
              Util.alertMessage(Events.eventType.warning," limit set for "+designations[i].designationName +" must be  less than its parent "+parent.designationName);
              status = false;
              break;
           }
         }
       }
        return status;
     }
    /**
     * Billing configuration ends
     */
});
