app.controller('PermissionController', function($scope, $rootScope, $state, $timeout, AppModel, $uibModal, ApiCall, Events, Util, $localStorage, UtilityService, Constants,UserService) {
  $scope.permission = {};
  $scope.addPermission = {};
  $scope.checkPermission = UserService.checkPermission;
    $scope.permissionInit = function(fromAddService) {
        // $scope.permission.designation = AppModel.getSetting('designation');
        // $scope.UtilityService = UtilityService;
        var temp = '';
        // $scope.checkPermission('Login','POST');
        $rootScope.showLoader = true;
        ApiCall.getDesignation(function(response) {
            $rootScope.showLoader = false;
            Util.alertMessage(Events.eventType.success, response.Message);
            $scope.permission.designations = response.Data;
            if (fromAddService)
                $scope.addPermission.designations = response.Data;

            $scope.permission.selectedDesignation = $scope.permission.designations[0];
            // calling for the web service for selected designation
            if (!fromAddService)
                $scope.fetchWebServiceDetails();

        }, function(err) {
            $rootScope.showLoader = false;
            Util.alertMessage(Events.eventType.error, err.Message);
        })

    }


    $scope.fetchWebServiceDetails = function() {
        $rootScope.showLoader = true;
        ApiCall.getAuthentication({
            designation: $scope.permission.selectedDesignation.designationId
        }, function(response) {
            // Util.alertMessage(Events.eventType.success,response.Message);
            $rootScope.showLoader = false;
            $scope.permission.webServices = response;
        }, function(err) {
            $rootScope.showLoader = false;
            Util.alertMessage(Events.eventType.error, err.Message);
        })

    }
    $scope.savePermission = function(permission) {
        console.log(permission.webServices == $scope.permission.webServices);
        // permission.actType = 'U';
        var obj = {
            authenticaiton: permission.webServices,
            actType: 'U'
        }
        ApiCall.postAuthentication(obj, function(response) {
            Util.alertMessage(Events.eventType.success, response.Message);
            // $scope.permission.webServices = response;
        }, function(err) {
            Util.alertMessage(Events.eventType.error, err.Message);
        })
    }
    /**
     * code for the add permission starts
     */

    $scope.addPermissionInit = function() {
        if (!$scope.permission.designations) {
            $scope.permissionInit(true);
        }
        ApiCall.getServiceList(function(response) {
            // Util.alertMessage(Events.eventType.success, response.Message);
            $scope.addPermission.webServices = response;
        }, function(err) {
            Util.alertMessage(Events.eventType.error, err.Message);
        })
        // $scope.addPermission.webServices = [{
        //     "name": "Login",
        //     "get": false,
        //     "post": false,
        //     "put": false,
        //     "delete": false,
        //     "options": false
        // }, {
        //     "name": "VendorCheckList",
        //     "get": false,
        //     "post": false,
        //     "put": false,
        //     "delete": false,
        //     "options": false
        // }, {
        //     "name": "LogOut",
        //     "get": false,
        //     "post": false,
        //     "put": false,
        //     "delete": false,
        //     "options": false
        // }]
    }
    $scope.saveAddPermission = function() {
      console.log($scope.addPermission.selectedDesignation);
      // permission.actType = 'U';
      for(var i in $scope.addPermission.webServices) {
        $scope.addPermission.webServices[i].designation = $scope.addPermission.selectedDesignation.designationId;
      }
      var obj = {
        authenticaiton: $scope.addPermission.webServices,
        actType: 'I'
      }
      ApiCall.postAuthentication(obj, function(response) {
          Util.alertMessage(Events.eventType.success, response.Message);
          // $scope.permission.webServices = response;
      }, function(err) {
          Util.alertMessage(Events.eventType.error, err.Message);
      })
    }
        /**
         * code for the add permission ends
         */

})
