app.controller('Tender_controller',function($scope,$rootScope,$state,MainService,$timeout,$cookieStore,$localStorage){
  $scope.init = function(){
    $scope.$on('$viewContentLoaded',function(event) {
      $(document).trigger("TemplateLoaded");
    });
  }
  $rootScope.is_loggedin = true;
  /***************************************************************************/
  /**************************This is use for adding new tender page****************************/
  /***************************************************************************/
  $scope.addNewTender = function() {
    $state.go('AddTenderDetails');
  }
  /***************************************************************************/
  /**************************This is use for to go edit tender page****************************/
  /***************************************************************************/
  $scope.gotoEditTenderDetails = function(){
      $state.go('tenderDetails');
  }
})
