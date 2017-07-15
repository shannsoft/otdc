app.controller('InvoiceController', function($scope, $rootScope,$window,$location,AppModel,ModalManagerService, UserService,Events,$state,$uibModal, $stateParams,$filter, ApiCall,Util,$timeout,$localStorage,UtilityService,Constants) {
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
   * functionName :validateApprover
   * Info : This is used to validate the log in user to valid to approve/reject the invoice
            based the limit set in the confugration
   */
   $scope.validateApprover = function(invoiceData){
     var validUsers = invoiceData.notifyDesignation.split(",");
     console.log(validUsers,UserService.getUser().designationId);
     if(validUsers.indexOf((UserService.getUser().designationId) != -1 ||  UserService.getUser().designationId == "SUPER ADMIN" ) && invoiceData.sts == "PENDING"){
       return true;
     }
     else {
       return false;
     }
   }
  /**
   * functionName :onInvoiceAction
   * Info : on approve , this will assign to finance controller for the approval
   On reject will reassign to the user with reject comment
   *
   */
  $scope.onInvoiceAction = function(invoiceData,type) {
    switch (type) {
      case 0:// reject
      var data = {
        actType:"REJECT",
        id:invoiceData.id
      }
      var modalData = {
        page:"invoiceDetails",
        size:"md",
        data:{
          actType:"APPROVE",
          id:invoiceData.id
        }
      }

        ModalManagerService.initModal(modalData);
      // ApiCall.putInvoice(data,function(res) {
      //   Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
      //   //$scope.invoiceDetailsInit();
      // },function(err) {
      //   $rootScope.showPreloader = false;
      //   Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
      // })
        break;
      case 1: // approve
      var data = {
        actType:"APPROVE",
        id:invoiceData.id
      }

      ApiCall.putInvoice(data,function(res) {
        Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
        //$scope.invoiceDetailsInit();
      },function(err) {
        $rootScope.showPreloader = false;
        Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
      })
        break;
      default:

    }
  }
});
