var app = angular.module("teknobiz", ['ui.router', 'ui.bootstrap', 'ngResource', 'ngStorage', 'ngAnimate','ngCookies']);
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
        .state('dashboard', {
            templateUrl: 'views/dashboard.html',
            url: '/dashboard',
            controller:"Main_Controller"
        })
        .state('login', {
            templateUrl: 'views/login.html',
            url: '/login',
            controller:"Main_Controller"
        })
        .state('forget-password', {
            templateUrl: 'views/forget.html',
            url: '/forget-password',
            controller:"Main_Controller"
        })
        .state('AddTender', {
            templateUrl: 'views/Tender/AddTender.html',
            url: '/AddTender',
            controller:"Tender_controller"
        })
        .state('AddTenderDetails', {
            templateUrl: 'views/Tender/TenderDetails.html',
            url: '/AddTenderDetails',
            controller:"Tender_controller"
        })
        .state('UserList', {
            templateUrl: 'views/User/userList.html',
            url: '/UserList',
            controller:"User_Controller"
        })
        .state('AddUser', {
            templateUrl: 'views/User/addUser.html',
            url: '/AddUser',
            controller:"User_Controller"
        })
        .state('editUserDetails', {
            templateUrl: 'views/User/userDetails.html',
            url: '/editUserDetails',
            controller:"User_Controller"
        })
        .state('tenderDetails', {
            templateUrl: 'views/Tender/editTenderDetails.html',
            url: '/tenderDetails',
            controller:"Tender_controller"
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
