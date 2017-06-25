app.controller('InvoiceController', function($scope, $rootScope,$window,$location,AppModel, Events,$state,$uibModal, $stateParams,$filter, ApiCall,Util,$timeout,$localStorage,UtilityService,Constants) {
  $scope.UtilityService = UtilityService;
  $scope.invoiceDetailsInit = function() {

    if(!$stateParams.tender || !$stateParams.invoice) {
      Util.alertMessage("warning","No Invoice selected ");
      $state.go("billing");
    }
    $scope.tender = $stateParams.tender;
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

});
