var dependency = [];
// lib  dependency
var distModules = ['ui.router', 'ui.bootstrap', 'ngResource', 'ngStorage', 'ngAnimate', 'ngCookies', 'ngMessages','ngTable'];
var custModules = ['validation', 'EventHandler', 'Authentication', 'WebService'];
dependency = dependency.concat(distModules).concat(custModules);

var app = angular.module("teknobiz", dependency);
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    //adding http intercepter
    $httpProvider.interceptors.push(function($q, $location, $window, $localStorage,Constants) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                // config.headers['Authorization'] = 'bearer '+$localStorage[Constants.getTokenKey()];
                config.headers['tokenID'] = $localStorage[Constants.getTokenKey()];
                if(Constants.debug) {
                  console.log("calling web service ->>>>>>>>>>>" , config.url);
                  console.log("Data web service ->>>>>>>>>>>" , JSON.stringify(config.data));

                }
                return config;
            },
            response: function(response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                    $location.path('/');
                }
                return response || $q.when(response);
            }
        };
    });

    function checkLoggedin($q, $timeout, $http, $location, $rootScope, $state, ApiCall,Constants, $localStorage, $rootScope, UserService) {
        var deferred = $q.defer();
        var obj = {
            TokenId: $localStorage[Constants.getTokenKey()]
        }
        ApiCall.token(obj, function(response) {
            if (response.StatusCode == 200 && response.Data && response.Status == "Success") {
                $timeout(function() {
                    $rootScope.loggedin = $localStorage[Constants.getLoggedIn()] = true;
                    UserService.setUser(response.Data);
                    deferred.resolve();
                    $state.go('dashboard',{role:UserService.getRole()});
                }, 100);
            } else {
                $timeout(function() {
                    $rootScope.loggedin = $localStorage[Constants.getLoggedIn()] = false;
                    deferred.resolve();
                }, 100);
            }

        }, function(err) {
            $timeout(function() {
                $rootScope.loggedin = $localStorage[Constants.getLoggedIn()] = false;
                deferred.resolve();
            }, 100);
        })

        return deferred.promise;
    };

    function checkLoggedout($q, $timeout, $http, $location, $rootScope, $state, ApiCall,$localStorage, AppModel,Constants, UserService,Events) {
        var deferred = $q.defer();
        var obj = {
            TokenId: $localStorage[Constants.getTokenKey()]
        }
        ApiCall.token(obj, function(response) {
            if (response.StatusCode == 200 && response.Data && response.Status == "Success") {
              $timeout(function() {
                $rootScope.loggedin = $localStorage[Constants.getLoggedIn()];
                UserService.setUser(response.Data);
                $rootScope.$emit(Events.userLogged);
                // fetching the details of the settings
                if(!AppModel.getSetting()) {
                  $rootScope.showPreloader = true;
                  ApiCall.getCommonSettings(function(response) {
                    $rootScope.showPreloader = false;
                    AppModel.setSetting(response.Data);
                  },function(err) {
                    $rootScope.showPreloader = false;
                    Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
                  })
                }
                deferred.resolve();
              }, 100);

            } else {
                $timeout(function() {
                    $rootScope.loggedin = $localStorage[Constants.getLoggedIn()] = false;
                    deferred.resolve();
                    $state.go('login');
                }, 100);
            }

        }, function(err) {
            $timeout(function() {
                $rootScope.loggedin = $localStorage[Constants.getLoggedIn()] = false;
                deferred.resolve();
                $state.go('login');
            }, 100);
        })
        return deferred.promise;
    };

    $urlRouterProvider.otherwise('/login');
    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
        .state('dashboard', {
            // templateUrl: 'src/views/dashboard.html',
            templateUrl: 'src/views/User/dashboard.html',
            url: '/dashboard',
            controller: "UserController",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('login', {
            templateUrl: 'src/views/login.html',
            url: '/login',
            controller: "LoginController",
            resolve: {
                loggedin: checkLoggedin
            },
        })
        .state('profile', {
            templateUrl: 'src/views/User/userProfile.html',
            url: '/profile',
            controller: "UserController",
            resolve: {
                loggedin: checkLoggedout
            },
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
            controller: "TenderListController",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('tenderDetails', {
            templateUrl: 'src/views/Tender/TenderDetails.html',
            url: '/tenderDetails/:tenderId',
            params: { tenderId: null ,action:null},
            controller: "TenderDetailsController",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('tenderDetailsEdit', {
            templateUrl: 'src/views/Tender/TenderDetails.html',
            url: '/tenderDetails/:tenderId',
            params: { tenderId: null ,action:null},
            controller: "TenderDetailsController",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('addTender', {
            templateUrl: 'src/views/Tender/addTender.html',
            url: '/addTender',
            controller: "AddTendorController",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('editTender', {
            templateUrl: 'src/views/Tender/editTenderDetails.html',
            url: '/editTender',
            // controller: "Tender_controller",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('tenderAssign', {
            templateUrl: 'src/views/Tender/tenderAssignment.html',
            url: '/tenderAssign',
            controller: "TenderAssignController",
              params: { tender: null},
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('UserList', {
            templateUrl: 'src/views/User/userList.html',
            url: '/UserList',
            controller: "UserListController",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('addUser', {
            templateUrl: 'src/views/User/addUser.html',
            url: '/addUser',
            controller: "UserController",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('userDetails', {
            templateUrl: 'src/views/User/userDetails.html',
            url: '/userDetails/:userId',
            controller: "UserDetailsController",
            params: { userId: null ,action:null},
            resolve: {
                loggedout: checkLoggedout
            },
        })
        // .state('editUser', {
        //     templateUrl: 'src/views/User/userDetails.html',
        //     url: '/editUser/:userId',
        //     controller: "UserDetailsController",
        //     params: { userId: null ,action:null},
        //     resolve: {
        //         loggedout: checkLoggedout
        //     },
        // })
        .state('VendorList', {
            templateUrl: 'src/views/Vendor/vendorList.html',
            url: '/VendorList',
            controller: "VendorController",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('addVendor', {
            templateUrl: 'src/views/Vendor/addVendor.html',
            url: '/addVendor',
            controller: "VendorController",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('vendorDetails', {
            templateUrl: 'src/views/Vendor/vendorDetails.html',
            url: '/vendorDetails/:vendorId',
            controller: "VendorDetailsController",
            params: { vendorId:null,vendor: null,action:null },
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('forget_password', {
            templateUrl: 'src/views/forgetpassword.html',
            url: '/forget_password',
            controller: "LoginController",
            // resolve: {
            //     loggedout: checkLoggedout
            // },
        })
        .state('tender_assign', {
            templateUrl: 'src/views/Tender/assignTender.html',
            url: '/tender_assign',
            // controller: "Tender_controller",
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('tender_milestone', {
            templateUrl: 'src/views/Tender/TendorMilestone.html',
            url: '/tender_milestone/:tenderId',
            controller: "TenderMilestoneController",
            resolve: {
                loggedout: checkLoggedout
            },
            params:{
              tenderId:null,
              tender:null
            }
        })
        .state('role_management', {
            templateUrl: 'src/views/Role/roleList.html',
            url: '/roles',
            controller: "RoleListController",
            resolve: {
                loggedout: checkLoggedout
            }
        })
        .state('permission_management', {
            templateUrl: 'src/views/User/permission.html',
            url: '/permission',
            controller: "PermissionController",
            resolve: {
                loggedout: checkLoggedout
            }
        })
        .state('vendorChecklist', {
            templateUrl: 'src/views/Vendor/addCheckList.html',
            url: '/vendorChecklist/:vendorId',
            controller: "VendorChecklistController",
            params: { vendorId:null,vendor: null},
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('projectMilestone', {
            templateUrl: 'src/views/Tender/projectMilestone.html',
            url: '/projectMilestone/:tenderId',
            controller: "ProjectMilestoneController",
            params: { tenderId:null,tenderList:null},
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('projectMilestoneDetails', {
            templateUrl: 'src/views/Tender/projectMilestoneDetails.html',
            url: '/projectMilestoneDetails/:tenderId',
            controller: "ProjectMilestoneController",
            params: { tenderId:null,milestone:null,action:null},
            resolve: {
                loggedout: checkLoggedout
            },
        })
        .state('addProjectMilestone', {
            templateUrl: 'src/views/Tender/addProjectMilestone.html',
            url: '/addProjectMilestone/:tenderId',
            controller: "ProjectMilestoneController",
            params: { tenderId:null},
            resolve: {
                loggedout: checkLoggedout
            },
        })

});
app.constant('CONFIG', {
    'HTTP_HOST': '../ep-portal/Server/api.php' //client staging
})
app.run(function($http, EnvService, Constants) {
    // $http.get('env.json')
    //     .success(function(response) {
    //         EnvService.setEnvData(response);
    //         console.log(EnvService.getEnvData());
    //         return;
    //     })
    //     .error(function(error) {
    //         return error;
    //     });
    EnvService.setSettings(Constants);

});
app.factory('Util', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    var Util = {};
    $rootScope.alerts = [];
    Util.alertMessage = function(msgType, message) {
        if (msgType == "failed")
            msgType = "warning";
        var alert = {
            type: msgType,
            msg: message
        };
        $rootScope.alerts.push(alert);
        $timeout(function() {
            $rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
        }, 2000);
    };
    return Util;
}]);
