angular.module('ModalManager', [])
  .controller('DashInvoiceListCtrl', function($rootScope, $scope, $uibModalInstance, data) {
    $scope.title = data.title;
    $scope.contents = data.contents;
    $scope.ok = function() {
      $uibModalInstance.close('ok');
    };
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  })
  .controller('InvoiceRejectModalCtrl', function($rootScope, $scope, $uibModalInstance,Util, ApiCall,data) {
    $scope.rejectdata = data;
    $scope.ok = function() {
      // call service to
      ApiCall.putInvoice($scope.rejectdata,function(res) {
        Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
        //$scope.invoiceDetailsInit();
        $uibModalInstance.close('ok');
      },function(err) {
        $rootScope.showPreloader = false;
        Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
        $uibModalInstance.close('ok');
      })


    };
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  })
  .factory('ModalManagerService', function($uibModal) {
    var ModalManagerService = {};
    ModalManagerService.initModal = function(modalData) {

      switch (modalData.page) {
        case 'dashboard':
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'src/views/modals/dashBillingListModal.html',
            controller: 'DashInvoiceListCtrl',
            size: modalData.size,
            resolve: {
              data: function() {
                return modalData.data;
              }
            }
          });
          break;


        case 'invoiceDetails':
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'src/views/modals/invoiceRejectModal.html',
            controller: 'InvoiceRejectModalCtrl',
            size: modalData.size,
            resolve: {
              data: function() {
                return modalData.data;
              }
            }
          });


          break;
        default:

      }
    }

    return ModalManagerService;
  })
