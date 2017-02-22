app.controller('TenderMilestoneController', function($scope, $rootScope, $state, $filter,$stateParams, ApiCall, Util, Events, EnvService, $timeout, $cookieStore, $localStorage) {
    $scope.dateChange = function(data) {
        console.log("data  ", $scope.tenderMilestone, data);
    }
    $scope.init = function() {
        $scope.tenderMilestone = {};
        if (!$stateParams.tenderId || !$stateParams.tender) {
            Util.alertMessage(Events.eventType.warning, Events.selectTender);
            $state.go("tenderList");
        } else {
                $scope.tender = $stateParams.tender;
                ApiCall.getMilestone({
                        tenderId: $stateParams.tenderId
                    }, function(response) {
                        Util.alertMessage(Events.eventType.success, response.Message);
                        $scope.tenderMilestone = response.Data;
                        // filtering out the time from the date
                        for(var i in $scope.tenderMilestone) {
                          $scope.tenderMilestone[i].startDate = $filter('filterDate')($scope.tenderMilestone[i].startDate);
                          $scope.tenderMilestone[i].endDate = $filter('filterDate')($scope.tenderMilestone[i].endDate);
                          $scope.tenderMilestone[i].completionDate = $filter('filterDate')($scope.tenderMilestone[i].completionDate);
                        }
                        $scope.updateDueDate($scope.tenderMilestone);
                    },
                    function(err) {
                        Util.alertMessage(Events.eventType.error, err.Message);
                    }
                )
        }

    }
    $scope.updateDueDate = function(tenderMilestone) {
      var mEnd;
      for(var i in tenderMilestone) {
        if(i == 0 )
        continue; // continue for the index of the doc received
        // for test milestone calculate the due date
        if(tenderMilestone[i].completionDate && tenderMilestone[i].completionDate!= '')
          mEnd = moment(new Date(tenderMilestone[i].completionDate));
        else
          mEnd = moment(new Date(tenderMilestone[i].endDate));
        var mToday = moment(new Date());
        var diff = mToday.diff(mEnd, 'days');
        if(diff > 0){
          tenderMilestone[i].dueDayCount = diff;
        }
        else {
          tenderMilestone[i].dueDayCount = 0;
        }
      }
    }
    $scope.closeTicket = function(index) {
        console.log("$scope.tenderMilestone  ",$scope.tenderMilestone);
        return;
        if(index != 0 && !$scope.tenderMilestone[index].completionDate){
          Util.alertMessage(Events.eventType.warning, "Please select Date");
          return;
        }
        var isValid = true;
        switch (index) {
           /*
           * Note : Only in case of the doc received the acttype = 'RECEPT_DOC' , in all other cases it will be 'U'
           */
            case 0: //"Receipt Of Doc"
                $scope.tenderMilestone[index].actType = 'RECEPT_DOC';
                $scope.tenderMilestone[index].isClosed = true;
                break;
            case 1 : //"Technical Bid":
            case 2 : //"Opening Of Financial Bid":
            case 3 : //"Approval Of The Tender Date":
            case 4 : //"Singing Of Agreement Date":
            case 5 : //"Handing Over Of the Site":
            $scope.tenderMilestone[index].actType = 'U';
            $scope.tenderMilestone[index].isClosed = true;
                break;

            default:
                Util.alertMessage(Events.eventType.warning, Events.invalidOperation);
                isValid = false; // do not call web service for invalid operation
                break;
        }
        if (isValid) {
            // call web service
            ApiCall.postMilestone($scope.tenderMilestone[index], function(response) {
                    Util.alertMessage(Events.eventType.success, response.Message);
                    //$scope.tenderMilestone = response.Data;
                    $state.reload();
                },
                function(err) {
                    Util.alertMessage(Events.eventType.error, err.Message);
                }
            )
        }
    }
})
