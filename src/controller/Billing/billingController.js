app.controller('BillingController', function($scope, $rootScope,$window,$location,AppModel, Events,$state,$uibModal, $stateParams,$filter, ApiCall,Util,$timeout,$localStorage,UtilityService,Constants) {
  $scope.UtilityService = UtilityService;

  $scope.billingInit = function() {
    $scope.billing = {};
    ApiCall.getTendor(function(res) {
      $rootScope.showPreloader = false;
      $scope.billing.tenderList = res.Data;
      // checking for the selected tenderId
      if($stateParams.tenderId) {
        $rootScope.showPreloader = true;
        ApiCall.getTendor({tenderId:$stateParams.tenderId},function(res) {
          $rootScope.showPreloader = false;
          $scope.billing.selectedTender = res.Data;
          // for(var i in $scope.billing.selectedTender.boqData) {
          //   if(i==1 || i==2){
          //     $scope.billing.selectedTender.boqData[i].invoiceIsLocked = true;
          //   }
          // }
          $scope.selectVendor($scope.billing.selectedTender.vendorInfo);
          // adding extra column for the completed unit
          angular.forEach($scope.billing.selectedTender.boqData,function(value,key) {
            value['completedUnit'] = value.unitPaid;
            value['price'] = 0;
          })
        },function(err) {
          $rootScope.showPreloader = false;
          Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
        })
        // var index = UtilityService.getmatchIndex($scope.billing.tenderList,'tenderId',$stateParams.tenderId);
        // $scope.billing.selectedTender = $scope.billing.tenderList[index]
      }
      else{
        $scope.selectTender($scope.billing.tenderList[0]); // select first index by default
      }
    }, function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
      $rootScope.showPreloader = false;
    })
  }
  $scope.selectVendor = function(vendors) {
    if(Array.isArray(vendors)){
      for(var i in vendors){
        if(vendors[i].isActive){
          $scope.billing.selectedTender.selectedVendor = vendors[i];
        }
      }
    }
    else{
      $scope.billing.selectedTender.selectedVendor = vendors;
    }
  }
  // $scope.getBoqHeaders = function(data) {
  //   if(!data){
  //     data = $scope.billing.selectedTender.boqData[0];
  //   }
  //   var arr = UtilityService.getTableHeaders(data);
  //   return arr;
  // }
  $scope.selectTender = function(selectedTender) {
    // reload the state with new data
    $state.go($state.current, {tenderId:selectedTender.tenderId,tenderList:$scope.billing.tenderList}, {reload: true});
  }
$scope.generateBill = function() {

  var selected = false;
  for(var i in $scope.billing.selectedTender.boqData){
    if($scope.billing.selectedTender.boqData[i].isChecked){
      selected = true;
    }
  }
  if(!selected) {
    Util.alertMessage('warning',"Please select Boq items");
    return;
  }
  AppModel.pushHistory($location.$$url);
  $state.go("generateBill",{tender:$scope.billing.selectedTender})
}
/**
***************************************************** Generate Billing starts ****************************************
 */
$scope.generateBillingInit = function(){
  // getting vendor details
  $scope.generateBill = {
    serviceTaxPer : 1,
    incomeTaxPer  : 2,
    holdPercent:3,
    salesTaxPer:5
  };

  if(!$stateParams.tender){
    Util.alertMessage(Events.eventType.warning,Events.selectTender);
    $state.go("billing");
    return;
  }
  $scope.generateBill.tender = $stateParams.tender;
  // parsing the selected the boq for the bill generation
  $scope.generateBill.tender.selectedBoq = [];
  for(var i in $scope.generateBill.tender.boqData){
    if($scope.generateBill.tender.boqData[i].isChecked){
      // updating price as per completed unit
      $scope.generateBill.tender.boqData[i].price = ($scope.generateBill.tender.boqData[i].completedUnit - $scope.generateBill.tender.boqData[i].unitPaid) * $scope.generateBill.tender.boqData[i].estimateRate;
      $scope.generateBill.tender.selectedBoq.push($scope.generateBill.tender.boqData[i]);
    }
  }
  // delete the boq data after parsing selected boq
  delete $scope.generateBill.tender['boqData'];
  console.log("generateBill.tender.selectedBoq   ",JSON.stringify($scope.generateBill.tender.selectedBoq));
  $scope.getSumTotal();
}
$scope.onBillingApproval = function() {

  var data = {
         tenderId : $scope.generateBill.tender.tenderId,
         vendorId : $scope.generateBill.tender.selectedVendor.vendorId,
         totalAmount : $scope.generateBill.sumTotal,
        //  incomeTaxPer : $scope.generateBill.incomeTax,
        //  incomeTaxAmt : $scope.generateBill.incomeTaxAmt,
         salesTaxPer : $scope.generateBill.salesTaxPer,
         salesTaxAmt : $scope.generateBill.salesTaxAmt,
         serviceTaxPer : $scope.generateBill.serviceTaxPer,
         serviceTaxAmt : $scope.generateBill.serviceTaxAmt,
         holdingPer : $scope.generateBill.holdPercent,
         holdingAmt : $scope.generateBill.holdAmount,
         totalAmountAfterTax : $scope.generateBill.grandTotal,
         //invoiceDetails: $scope.generateBill.tender.selectedBoq
        }
        // added 'boqId' in place of id
        for(var i in $scope.generateBill.tender.selectedBoq){
          $scope.generateBill.tender.selectedBoq[i]['boqId'] = $scope.generateBill.tender.selectedBoq[i].id;
          delete $scope.generateBill.tender.selectedBoq[i]['id']; // removed
        }
        data['invoiceDetails'] = $scope.generateBill.tender.selectedBoq;

        console.log('data' ,JSON.stringify(data));
        ApiCall.postInvoice(data,function(res) {
          Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
          $location.path(AppModel.popHistory());
        },function(err) {
          $rootScope.showPreloader = false;
          Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
        })
}
$scope.$watch('generateBill.holdPercent',function(value) {
  console.log("value  ",value,typeof value);
  if(parseFloat(value) > 100 ){
    $scope.generateBill.holdPercent = 99;
  }
  else if(parseFloat(value) < 0) {
    $scope.generateBill.holdPercent = 0;
  }

  // else if(!value || value == '') {
  //   $scope.generateBill.holdPercent = 0;
  // }

  $scope.getSumTotal();
})
/**
 * Used to get the total amount of the bill based on the selected item and the quantity
 */
$scope.getSumTotal = function() {
  var grandTotal = 0;
  if(!$scope.generateBill.tender || !$scope.generateBill.tender.selectedBoq)
  return;
  $scope.generateBill.sumTotal = 0;
  for(var i in $scope.generateBill.tender.selectedBoq){
    $scope.generateBill.sumTotal+= $scope.generateBill.tender.selectedBoq[i].price;
  }
  $scope.generateBill.salesTaxAmt = parseFloat(($scope.generateBill.salesTaxPer/100*$scope.generateBill.sumTotal).toFixed(2));
  $scope.generateBill.serviceTaxAmt = parseFloat(($scope.generateBill.serviceTaxPer/100*$scope.generateBill.sumTotal).toFixed(2));
  $scope.generateBill.holdAmount = parseFloat(( parseFloat($scope.generateBill.holdPercent)/100*$scope.generateBill.sumTotal).toFixed(2));
  $scope.generateBill.grandTotal   = ($scope.generateBill.sumTotal - ($scope.generateBill.salesTaxAmt + $scope.generateBill.serviceTaxAmt+$scope.generateBill.holdAmount)).toFixed(2);
  if(isNaN($scope.generateBill.grandTotal)){
    $scope.generateBill.hideTotal = true;
  }
  else {
    $scope.generateBill.hideTotal = false;
  }
}

$scope.printInvoice = function(tender) {

  var vendorObj = tender.selectedVendor;
  var queryString = '';
  queryString+="invoice="+"autoGenValues"+"&";
  queryString+="createdDate="+$filter('date')(new Date(), "dd/mm/yyyy")+"&";
  queryString+="tenderId="+tender.tndId+"&";
  queryString+="tenderType="+tender.tenderType+"&";
  queryString+="category="+tender.category+"&";
  queryString+="vendor="+JSON.stringify(vendorObj);
  console.log("opening  "+Constants['envData']['dev']['appPath']+"/invoice.html?"+queryString);
  window.open("invoice.html?"+queryString);
}

/*
  * getInvoices : used to get all the invoices against the tender
*/
$scope.getInvoices = function() {
  var data = {
    tender:$scope.billing.selectedTender.tenderId
  }
  ApiCall.getInvoice(data,function(res) {
    Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
      $scope.billing.invoices = res.Data;
  },function(err) {
    $rootScope.showPreloader = false;
    Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
  })
}
/*
  * getting invoice details
*/
$scope.getInvoiceDetails = function(invoiceId) {
  $state.go("invoiceDetails",{invoice:invoiceId,tender:$scope.billing.selectedTender});
}
/**
***************************************************** Generate Billing ends ****************************************
 */


});
