app.controller('InvoiceController', function($scope, $rootScope,$window,$location,AppModel, Events,$state,$uibModal, $stateParams,$filter, ApiCall,Util,$timeout,$localStorage,UtilityService,Constants) {
  $scope.UtilityService = UtilityService;
  $scope.invoiceDetailsInit = function() {

    if(!$stateParams.invoice || (!$stateParams.tender && !$stateParams.tenderId)) {
      Util.alertMessage("warning","No Invoice selected ");
      $state.go("billing");
    }
    if($stateParams.tender) {
      $scope.tender = $stateParams.tender;
    }
    if(!$stateParams.tender && $stateParams.tenderId){
      ApiCall.getTendor({tenderId: $stateParams.tenderId},function(res) {
        $rootScope.showPreloader = false;
        Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
          $scope.tender = res.Data;
      },function(err) {
        $rootScope.showPreloader = false;
        Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
      })
    }
    var data = {
      invoice:$stateParams.invoice
    }
    ApiCall.getInvoice(data,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
        $scope.invoiceData = res.Data;
    },function(err) {
      $rootScope.showPreloader = false;
      Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
    })
  }
  /**
   * functionName :onInvoiceAction
   * Info : on approve , this will assign to finance controller for the approval
   On reject will reassign to the user with reject comment
   *
   */
  $scope.onInvoiceAction = function(type) {

  }
});
