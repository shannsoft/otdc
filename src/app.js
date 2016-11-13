var app = angular.module("teknobiz", ['ui.router', 'ui.bootstrap', 'ngResource', 'ngStorage', 'ngAnimate','ngCookies']);
app.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  //adding http intercepter
  $httpProvider.interceptors.push(function ($q, $location, $window,$localStorage) {
      return {
          request: function (config) {
              config.headers = config.headers || {};
              // config.headers['Authorization'] = 'bearer '+$localStorage[Constants.getTokenKey()];
              return config;
          },
          response: function (response) {
              if (response.status === 401) {
                  // handle the case where the user is not authenticated
                  $location.path('/');
              }
              return response || $q.when(response);
          }
      };
  });

  function checkLoggedin($q, $timeout, $http, $location, $rootScope, $state,$localStorage,$rootScope) {
      var deferred = $q.defer();
      // $timeout(deferred.resolve, 0);
      if ($rootScope.is_loggedin) {
            $timeout(function () {
                deferred.resolve();
                $state.go("dashboard");
            }, 100);
          }
          else {
            $timeout(function () {
                deferred.resolve();
            }, 100);
          }
      return deferred.promise;
  };
  function checkLoggedout ($q, $timeout, $http, $location, $rootScope, $state,$localStorage) {
      var deferred = $q.defer();
      if ($rootScope.is_loggedin) {
        $timeout(deferred.resolve, 0);
          }
          else {
            $timeout(function () {
                deferred.resolve();
                $state.go('login');
            }, 100);
          }
      return deferred.promise;
  };

    $urlRouterProvider.otherwise('/login');
    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
        .state('dashboard', {
            templateUrl: 'src/views/dashboard.html',
            url: '/dashboard',
            controller:"Main_Controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('login', {
            templateUrl: 'src/views/login.html',
            url: '/login',
            controller:"Main_Controller",
            resolve: {loggedin: checkLoggedin},
        })
        // .state('forget-password', {
        //     templateUrl: 'src/views/forget.html',
        //     url: '/forget-password',
        //     controller:"Main_Controller",
        //     resolve: {loggedout: checkLoggedout},
        // })
        .state('tenderList', {
            templateUrl: 'src/views/Tender/tenderList.html',
            url: '/tenderList',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('addTender', {
            templateUrl: 'src/views/Tender/addTender.html',
            url: '/addTender',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('editTender', {
            templateUrl: 'src/views/Tender/editTenderDetails.html',
            url: '/editTender',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('tenderDetails', {
            templateUrl: 'src/views/Tender/TenderDetails.html',
            url: '/tenderDetails',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('UserList', {
            templateUrl: 'src/views/User/userList.html',
            url: '/UserList',
            controller:"User_Controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('addUser', {
            templateUrl: 'src/views/User/addUser.html',
            url: '/addUser',
            controller:"User_Controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('editUser', {
            templateUrl: 'src/views/User/editUser.html',
            url: '/editUser',
            controller:"User_Controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('VendorList', {
            templateUrl: 'src/views/Vendor/vendorList.html',
            url: '/VendorList',
            controller:"Vendor_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('addVendor', {
            templateUrl: 'src/views/Vendor/addVendor.html',
            url: '/addVendor',
            controller:"Vendor_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('vendorDetails', {
            templateUrl: 'src/views/Vendor/vendorDetails.html',
            url: '/vendorDetails',
            controller:"Vendor_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('editVendor', {
            templateUrl: 'src/views/Vendor/editVendor.html',
            url: '/editVendor',
            controller:"Vendor_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('forget_password', {
            templateUrl: 'src/views/forgetpassword.html',
            url: '/forget_password',
            controller:"Main_Controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('tender_assign', {
            templateUrl: 'src/views/Tender/assignTender.html',
            url: '/tender_assign',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('tender_milestone', {
            templateUrl: 'src/views/Tender/TendorMilestone.html',
            url: '/tender_milestone',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('tender_checklist', {
            templateUrl: 'src/views/Tender/TenderCheckList.html',
            url: '/tender_checklist',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
  });
  app.constant('CONFIG', {
    'HTTP_HOST': '../ep-portal/Server/api.php' //client staging
  })
  app.factory('Util', ['$rootScope',  '$timeout' , function( $rootScope, $timeout){
      var Util = {};
      $rootScope.alerts =[];
      Util.alertMessage = function(msgType, message){
          var alert = { type:msgType , msg: message };
          $rootScope.alerts.push( alert );
           $timeout(function(){
              $rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
           }, 5000);
      };
      return Util;
  }]);
app.run(function($rootScope) {
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
    $rootScope.stateName = toState.name;
  });
});
