angular.module('ModalManager', [])
.controller('DashInvoiceListCtrl',function($rootScope,$scope,$uibModalInstance, data){
  $scope.title = data.title;
  $scope.contents = data.contents;
  $scope.ok = function () {
    $uibModalInstance.close('ok');
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
.factory('ModalManagerService',function($uibModal){
  var ModalManagerService = {};
  ModalManagerService.initModal = function(obj){
        var modalData = obj.modalData; // overriding
        switch (modalData.page) {
          case 'dashboard':
          var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'src/views/modals/dashBillingListModal.html',
          controller: 'DashInvoiceListCtrl',
          size: modalData.size,
          resolve: {
            data: function () {
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
