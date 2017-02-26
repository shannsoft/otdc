app.controller('VendorController',function($scope,$rootScope,$state,Constants,$uibModal,NgTableParams,EnvService,$timeout,$cookieStore,$localStorage,ApiCall,Util){
  /***************************************************************************/
  /**************************This is use to show a pop up****************************/
  /***************************************************************************/
  $scope.onDeleteVendor = function (vendor) {

    $scope.selectedVendor = vendor;
    $scope.open();
  };
  $scope.open = function(){
      $scope.showModal = true;
  }
  /***************************************************************************/
  /**************************This is use to hide a pop up****************************/
  /***************************************************************************/
  $scope.ok = function () {
    console.log("vendor to be deleted",$scope.selectedVendor);
    var vendorData = {};
    //vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.vendorId = $scope.selectedVendor.vendorId;
    $rootScope.showPreloader = true;
    ApiCall.deleteVendor(vendorData,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      $scope.initVenderList();
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
    $scope.showModal = false;
    $scope.selectedVendor = null;
  };
  /***************************************************************************/
  /**************************This is use to hide a pop up****************************/
  /***************************************************************************/
  $scope.cancel = function () {
    console.log("vendor to be deleted cancelled ",$scope.selectedVendor);
    $scope.selectedVendor = null;
     $scope.showModal = false;
  };
  /***************************************************************************/
  /**************************This is use to go to edit vendor page****************************/
  /***************************************************************************/

  $scope.onAction = function(action,vendor) {
    switch (action) {
      case 'view':
      case 'edit':
        $state.go("vendorDetails",{vendorId:vendor.vendorId,vendor:vendor,action:action})
        break;
      case 'checklist':
        $state.go("vendorChecklist",{vendorId:vendor.vendorId,vendor: vendor});
        break;
      case 'delete':
        // call service to delete
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'deleteVendorModal.html',
          controller: 'deleteVendorModalCtrl',
          size: 'md',
          resolve: {
            vendor: function () {
              return vendor;
            }
          }
        });
        break;
      default:

    }
  }
  $scope.initVenderList = function(){
    var vendorData = {};
    // vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    // vendorData.actType = "GET_VENDOR_ALL";
    $rootScope.showPreloader = true;
    ApiCall.getVendor(vendorData,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      // $scope.vendors = res.Data;
      $scope.tableParams = new NgTableParams();
        $scope.tableParams.settings({
        dataset: res.Data
      });
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
  }
  $scope.addVendor = function(addVendorForm,vendorData){

    // vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.type = "I";
    $rootScope.showPreloader = true;
    ApiCall.postVendor(vendorData,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      $state.go("VendorList");
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
  }
})


app.controller('deleteVendorModalCtrl', function ($scope, $uibModalInstance,vendor,Util,ApiCall,$state,Events ) {
  $scope.vendor = vendor;
  $scope.ok = function () {
    // calling service to delete user
    var obj = {
      actType:'D',
      vendorId:vendor.vendorId
    }
    ApiCall.postVendor(obj,function(response) {
      Util.alertMessage(Events.eventType.success,response.Message);
      $uibModalInstance.close();
      $state.reload();
    },function(err) {
      Util.alertMessage(Events.eventType.error,err.Message);
      $uibModalInstance.close();
    })

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
