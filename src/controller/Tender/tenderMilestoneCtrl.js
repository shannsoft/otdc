app.controller('TenderMilestoneController', function($scope, $rootScope, $state, $stateParams, ApiCall, Util, Events, EnvService, $timeout, $cookieStore, $localStorage) {
    $scope.dateChange = function(data) {
        console.log("data  ", $scope.tenderMilestone, data);
    }
    $scope.init = function() {
        $scope.tenderMilestone = {};
        if (!$stateParams.tenderId) {
            Util.alertMessage(Events.eventType.warning, Events.selectTender);
            $state.go("tenderList");
        } else {
            $scope.tenderMilestone = [{
                    "actType": null,
                    "mileStoneId": 1,
                    "date": null,
                    "userId": 10015,
                    "tenderId": 100000,
                    "description": "Receipt Of Doc",
                    "startDate": "",
                    "endDate": "",
                    "completionDate": "1/10/2017",
                    "isClosed": "False"
                }, {
                    "actType": null,
                    "mileStoneId": 2,
                    "date": null,
                    "userId": 10015,
                    "tenderId": 100000,
                    "description": "Technical Bid",
                    "startDate": "1/10/2017",
                    "endDate": "1/6/2017",
                    "completionDate": "",
                    "isClosed": "False"
                }, {
                    "actType": null,
                    "mileStoneId": 3,
                    "date": null,
                    "userId": 10015,
                    "tenderId": 100000,
                    "description": "Opening Of Financial Bid",
                    "startDate": "1/15/2017",
                    "endDate": "1/7/2017",
                    "completionDate": "",
                    "isClosed": "False"
                }, {
                    "actType": null,
                    "mileStoneId": 4,
                    "date": null,
                    "userId": 10015,
                    "tenderId": 100000,
                    "description": "Approval Of The Tender Date",
                    "startDate": "1/18/2017",
                    "endDate": "1/2/2017",
                    "completionDate": "",
                    "isClosed": "False"
                }, {
                    "actType": null,
                    "mileStoneId": 5,
                    "date": null,
                    "userId": 10015,
                    "tenderId": 100000,
                    "description": "Singing Of Agreement Date",
                    "startDate": "1/10/2017",
                    "endDate": "1/3/2017",
                    "completionDate": "",
                    "isClosed": "False"
                }, {
                    "actType": null,
                    "mileStoneId": 6,
                    "date": null,
                    "userId": 10015,
                    "tenderId": 100000,
                    "description": "Handing Over Of the Site",
                    "startDate": "1/10/2017",
                    "endDate": "1/4/2017",
                    "completionDate": "",
                    "isClosed": "False"
                }]
                $scope.updateDueDate($scope.tenderMilestone);
                // $scope.tender = $stateParams.tender;
                // ApiCall.getMilestone({
                //         TenderId: $stateParams.tenderId
                //     }, function(response) {
                //         Util.alertMessage(Events.eventType.success, response.Message);
                //         $scope.tenderMilestone = response.Data;
                //     },
                //     function(err) {
                //         Util.alertMessage(Events.eventType.error, err.Message);
                //     }
                // )
        }

    }
    $scope.updateDueDate = function(tenderMilestone) {
      for(var i in tenderMilestone) {
        if(i == 0 )
        continue; // continue for the index of the doc received
        // for test milestone calculate the due date
        var mEnd = moment(new Date(tenderMilestone[i].endDate));
        var mToday = moment(new Date());
        var diff = mToday.diff(mEnd, 'days');
        if(diff){
          tenderMilestone[i].dueDayCount = diff;
        }
      }
    }
    $scope.closeTicket = function(index) {
        var isValid = true;
        switch ($scope.tenderMilestone[index].description) {
            case "Receipt Of Doc":
                $scope.tenderMilestone[index].actType = 'RECEPT_DOC';
                $scope.tenderMilestone[index].isClosed = true;

                break;
            case "Technical Bid":

                break;
            case "Opening Of Financial Bid":

                break;
            case "Approval Of The Tender Date":

                break;
            case "Singing Of Agreement Date":

                break;
            case "Handing Over Of the Site":

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
                },
                function(err) {
                    Util.alertMessage(Events.eventType.error, err.Message);
                }
            )
        }
    }
})
