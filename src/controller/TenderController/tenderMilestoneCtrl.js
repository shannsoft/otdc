app.controller('TenderMilestoneController', function($scope, $rootScope, $state, EnvService, $timeout, $cookieStore, $localStorage) {

    $scope.$on('$viewContentLoaded', function(event) {
        console.log("view loaded");
        $scope.tenderMilestone = {};
    });

})
