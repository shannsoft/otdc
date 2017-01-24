/**
 * This page is used to show the view and update for the tender details
 where if the action is selected as view and the fields are in disable Status
 if the action is edit user can edit the items
 */

app.controller('TenderDetailsController', function($scope, $rootScope, $state,$uibModal, $stateParams, ApiCall,Util, EnvService, $timeout, $cookieStore, $localStorage) {

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
    $scope.fileSelected = function(fileName) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>",window.fileData);
      $scope.FileData = window.fileData;
    }
    $scope.showBoq = function() {
        $uibModal.open({
            animation: true,
            size: 'lg',
            controller: "boqController",
            templateUrl:"src/views/Tender/modals/boqDetailsModal.html",
            resolve:{
              tender :function() {
                return $scope.tender
              }
            }
        });
    }
    $scope.updateTender = function(tender) {
      tender.actType = "U";
      tender.tenderType = tender.tenderType.typeName;
      tender.fileData = $scope.FileData;
      console.log(JSON.stringify(tender));
      $rootScope.showPreloader = true;
      ApiCall.postTendor(tender,function(res) {
        $state.go("tenderList");
        $rootScope.showPreloader = false;
        Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
      }, function(err) {
        $rootScope.showPreloader = false;
        Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
      })
    }
})

/**
 * boqController
 * Info : used to show the boq data in the modal
 */
app.controller('boqController', function ($scope,$uibModalInstance,tender,Util,ApiCall,$uibModal) {
  $scope.boqUpdateArr = [];
  $scope.boqData = tender.boqData;
  // used to update the boq data of the indivisual row
  $scope.updateBoqData = function(){
    ApiCall.postBOQHistory($scope.boqUpdateArr,function(response) {
      Util.alertMessage(response.Status.toLocaleLowerCase(),response.Message);
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
    })
  }
  $scope.showBoqHistory = function(){
    $uibModal.open({
        animation: true,
        size: 'lg',
        controller: "boqHistoryController",
        templateUrl:"boqHistoryModal.html",
        resolve:{
          tenderId :function() {
            return tender.tenderId
          }
        }
    });
  }
  $scope.focusEdit = function(boq,$event) {
    // reset the edit mode except the selected one
    angular.forEach($scope.boqData,function(boqData) {
      boqData == boq ? boq.isEdit = true : boqData.isEdit = false;
    })
  }
  $scope.getBoqHeaders = function() {
    var temp = $scope.boqData[0];
    var arr = []
    // getting headers as keys present in the boq details array
    angular.forEach(temp, function(index,value){
      arr.push(value);
    })
    return arr;
  }
  $scope.updateAmount = function(boq,param) {
    if(!boq.count || isNaN(boq.count)){
      boq.count = 0;
    }
    if(!boq[param]){
      boq.count++;
    }
    if(boq.count >=2){
      boq.count = 0;
      boq.isEdit = false; // here the values
    }

    // removing the duplicate boq if exist
    var found = false;
    for(var i in $scope.boqUpdateArr){
      if($scope.boqUpdateArr[i].id == boq.id){
        $scope.boqUpdateArr[i] = boq;
        found = true;
        break;
      }
    }
    if(!found){
      // update the array that will save in batch
      $scope.boqUpdateArr.push(boq);
    }
    boq.totalAmountWithoutTaxes = boq.quantity*boq.estimateRate;

  }
  $scope.ok = function () {
    $uibModalInstance.close();
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


/**
 * boqHistoryController
 * Info : used to show the boq history updated by different users
 */
app.controller('boqHistoryController', function ($scope,$uibModalInstance,tenderId,ApiCall,NgTableParams,Util) {
  var data = {
    tenderId : tenderId
  }
  $scope.boqHistory = [];
  $scope.updateUserDetails = function(data) {
    // close all the pop up
    angular.forEach($scope.boqHistory,function(v,k) {
      if(data == v) {
        v.isOpen = !v.isOpen;
      }
      else {
        v.isOpen = false;
      }
    })
    $scope.userDetails = data;
  }
  ApiCall.getBOQHistory(data,function(response) {
    $scope.boqHistory = response.Data;
    // $scope.boqHistory = response.Data;
    $scope.tableParams = new NgTableParams();
    $scope.tableParams.settings({
      dataset: response.Data
    });
    Util.alertMessage(response.Status.toLocaleLowerCase(),response.Message);
  },function(err) {
    Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
  })
  $scope.ok = function () {
    $uibModalInstance.close();
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
