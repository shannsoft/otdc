app.controller('TenderMilestoneController', function($scope, $rootScope, $state, $stateParams,ApiCall,Util,Events , EnvService, $timeout, $cookieStore, $localStorage) {

    $scope.init = function() {
        if (!$stateParams.tenderId) {
          Util.alertMessage(Events.eventType.warning,Events.selectTender);
          $state.go("tenderList");
        }
        else{
          var data = {
              tenderId: $stateParams.tenderId,
              // requireBoq : false
          }
          ApiCall.getTendor(data,function(response) {
            $scope.tenderMilestone = response.Data;
          },function(err) {
              Util.alertMessage(Events.eventType.error,err.Message);
          })
        }

    }
})
