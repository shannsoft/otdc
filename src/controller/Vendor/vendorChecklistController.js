app.controller('VendorChecklistController',function($scope,$rootScope,$state,$stateParams,Constants,Events,EnvService,$timeout,$cookieStore,$localStorage,ApiCall,Util){
  $scope.currTab = 0;
  $scope.vendorChecklist = {};
  $scope.vendorChecklist.checklist = [
    {
      name : "regdName",
      chkId:null,
    },
    {
      name : "pan",
      chkId:null,
    },
    {
      name : "turnOver",
      chkId:null,
    },
  ];
  $scope.init = function() {
    if(!$stateParams || !$stateParams.vendorId) {
      Util.alertMessage(Events.eventType.warning,Events.noVendorSelected);
      $state.go("VendorList");
    }
    else {
      $scope.vendorChecklist.vendorId = $stateParams.vendorId;
      // getting checklist details
      ApiCall.getVendorCheckList({vendorId:$stateParams.vendorId},function(res){
        Util.alertMessage(Events.eventType.success,res.Message);
        if(res.Data.length){
          $scope.vendorChecklist.isUpdate = true;
          $scope.vendorChecklist.checklist = res.Data;
        }
        else {
          $scope.vendorChecklist.isUpdate = false;
        }
      },function(err) {
        Util.alertMessage(Events.eventType.error,err.Message);
      })
    }
  }
  $scope.tabChange = function(tabPos) {
      $scope.currTab = tabPos;
  }
  $scope.submitChecklist = function(form) {
    // structuring multiple file upload
    for(var i in $scope.vendorChecklist.checklist){
      if($scope.vendorChecklist.checklist[i].fileData) {
        $scope.vendorChecklist.checklist[i].file = $scope.vendorChecklist.checklist[i].fileData.InputStream;
        $scope.vendorChecklist.checklist[i].fileName = $scope.vendorChecklist.checklist[i].fileData.fileName;
        delete $scope.vendorChecklist.checklist[i]['fileData']; // deleting file data as not required in the json
      }
      else {
        $scope.vendorChecklist.checklist[i].file = null;
        $scope.vendorChecklist.checklist[i].fileName = null;
      }
    }
    $scope.vendorChecklist.actType = "I"; // here note that actType = I represents both insert and update
    //$scope.vendorChecklist.isUpdate ? $scope.vendorChecklist.actType = "U" : $scope.vendorChecklist.actType = "I";
    $rootScope.showPreloader = true;
    ApiCall.postVendorCheckList($scope.vendorChecklist,function(res) {
      $rootScope.showPreloader = false;
      $state.reload();
    },function(err) {
      $rootScope.showPreloader = false;
      Util.alertMessage(Events.eventType.error,res.Message);
    })
  }
})
