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
            templateUrl: 'views/dashboard.html',
            url: '/dashboard',
            controller:"Main_Controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('login', {
            templateUrl: 'views/login.html',
            url: '/login',
            controller:"Main_Controller",
            resolve: {loggedin: checkLoggedin},
        })
        .state('forget-password', {
            templateUrl: 'views/forget.html',
            url: '/forget-password',
            controller:"Main_Controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('tenderList', {
            templateUrl: 'views/Tender/tenderList.html',
            url: '/tenderList',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('addTender', {
            templateUrl: 'views/Tender/addTender.html',
            url: '/addTender',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('editTender', {
            templateUrl: 'views/Tender/editTenderDetails.html',
            url: '/editTender',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('tenderDetails', {
            templateUrl: 'views/Tender/TenderDetails.html',
            url: '/tenderDetails',
            controller:"Tender_controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('UserList', {
            templateUrl: 'views/User/userList.html',
            url: '/UserList',
            controller:"User_Controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('addUser', {
            templateUrl: 'views/User/addUser.html',
            url: '/addUser',
            controller:"User_Controller",
            resolve: {loggedout: checkLoggedout},
        })
        .state('editUser', {
            templateUrl: 'views/User/editUser.html',
            url: '/editUser',
            controller:"User_Controller",
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
