/**
 * This page is used to show the view and update for the tender details
 where if the action is selected as view and the fields are in disable Status
 if the action is edit user can edit the items
 */

app.controller('TenderDetailsController', function($scope, $rootScope, $state,$uibModal, $stateParams, ApiCall, EnvService, $timeout, $cookieStore, $localStorage) {

    $scope.init = function() {
        $scope.isInit = false;
        $stateParams.action = $stateParams.action || "view"; // setting default action as view
        $scope.isView = $stateParams.action == "view" ? true : false;
        var data = {
            tenderId: $stateParams.tenderId
        }
        $rootScope.showPreloader = true;
        ApiCall.getTendor(data, function(res) {

            $scope.tender = res.Data;
            // Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
            $scope.isInit = true;
            $rootScope.showPreloader = false;
            // delete boq columns
            // for(var i in $scope.tender.boqData) {
            //   angular.forEach($scope.tender.boqData[i],function(v,k) {
            //     var temp = ['itemDescription','quantity','units','totalAmountWithoutTaxes'];
            //     if(temp.indexOf(k)  == -1)
            //       delete $scope.tender.boqData[i][k];
            //   })
            // }
        }, function(err) {
            Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
            $rootScope.showPreloader = false;
        })
    }
    $scope.onEditTendor = function(action, tender) {
        $state.go("tenderDetails", {
            tenderId: tender.tenderId,
            action: action
        });
    }
    $scope.showBoq = function() {
        $uibModal.open({
            animation: true,
            size: 'lg',
            controller: "boqController",
            templateUrl:"src/views/Tender/modals/boqDetailsModal.html",
            resolve:{
              boqData :function() {
                return $scope.tender.boqData
              }
            }
        });
    }
})
app.controller('boqController', function ($scope,$uibModalInstance,boqData) {
  $scope.boqData = boqData;
  // for(var i in $scope.boqData) {
  //   angular.forEach($scope.boqData[i],function(v,k) {
  //     delete $scope.boqData['$$hashKey'];
  //   })
  // }
  $scope.getBoqHeaders = function() {

    var temp = $scope.boqData[0];
    var arr = []
    // getting headers as keys present in the boq details array
    angular.forEach(temp, function(index,value){
      arr.push(value);
    })
    return arr;
  }
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
