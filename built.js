/*! otdc - v1.0.0 - Wed Jan 04 2017 09:45:14 */
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

    function checkLoggedin($q, $timeout, $http, $location, $rootScope, $state, Constants, $localStorage, $rootScope, LoginService, UserService) {
        var deferred = $q.defer();
        var obj = {
            TokenId: $localStorage[Constants.getTokenKey()]
        }
        LoginService.token(obj, function(response) {
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

    function checkLoggedout($q, $timeout, $http, $location, $rootScope, $state, $localStorage, Constants, LoginService, UserService,Events) {
        var deferred = $q.defer();
        var obj = {
            TokenId: $localStorage[Constants.getTokenKey()]
        }
        LoginService.token(obj, function(response) {
            if (response.StatusCode == 200 && response.Data && response.Status == "Success") {
              $timeout(function() {
                $rootScope.loggedin = $localStorage[Constants.getLoggedIn()];
                UserService.setUser(response.Data);
                $rootScope.$emit(Events.userLogged);
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
            url: '/vendorDetails',
            controller: "VendorDetailsController",
            params: { vendor: null,action:null },
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
              tenderId:null
            }
        })
        .state('tender_checklist', {
            templateUrl: 'src/views/Tender/TenderCheckList.html',
            url: '/tender_checklist',
            // controller: "Tender_controller",
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
    EnvService.setEnvData(Constants.envData);

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
;app.constant("Constants", {
        "debug":false,
        "storagePrefix": "goAppOTDC$",
        "getTokenKey" : function() {return this.storagePrefix + "token";},
        "getLoggedIn" : function() {return this.storagePrefix + "loggedin";},
        "availableColor" : "#3955dd",
        "checkedInColor" : "#ff0000",
        "bookedColor" : "#434845",
        "alertTime"   : 3000,
        "getUsername" : function() {return this.storagePrefix + "username";},
        "getPassword" : function() {return this.storagePrefix + "password";},
        "getIsRemember" : function() {return this.storagePrefix + "isRemember";},
        "hashKey" : "goAppOTDC",
        "envData" : {
          "env":"dev",
          "dev" : {
            "basePath" :"http://api.otdctender.in",
          }
        }
})
;app.controller('Main_Controller', function($scope, $rootScope, $state, EnvService, $timeout, $cookieStore, $localStorage, validationService, Events, $location, Util, $anchorScroll) {
    // Events handling
    
    $rootScope.$on(Events.validationFieldMissing, function(event, data) {
        alert("Event handled", data);
    });
    $scope.users = [{
            name: "Suresh Dasari",
            age: 30,
            location: 'Chennai'
        },

        {
            name: "Rohini Alavala",
            age: 29,
            location: 'Chennai'
        },
    ];
    // $scope.usersTable = new ngTableParams({}, {
    //     dataset: $scope.users
    // });
//});
$rootScope.$on(Events.errorInLogin, function(event, data) {
    $location.hash('top');
    $anchorScroll();
    Util.alertMessage(data.type, data.message || Events.errorInLogin);
})
$rootScope.$on(Events.errorInLogout, function(event, data) {
    $location.hash('top');
    $anchorScroll();
    Util.alertMessage(data.type, data.message || Events.errorInLogout);
})


// Event hander for the error type message
$rootScope.$on(Events.eventType.error, function(event, data) {
        $location.hash('top');
        $anchorScroll();
        Util.alertMessage(Events.eventType.error, data.message);
    })
    // Event hander for the warning type message
$rootScope.$on(Events.eventType.warn, function(event, data) {
        $location.hash('top');
        $anchorScroll();
        Util.alertMessage(Events.eventType.warn, data.message);
    })
    // Event hander for the success type message
$rootScope.$on(Events.eventType.success, function(event, data) {
        $location.hash('top');
        $anchorScroll();
        Util.alertMessage(Events.eventType.success, data.message);
    })
    // used to close the alert
$scope.close = function() {
    $rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
}
$scope.forgetpassword = function() {
$state.go('forget_password');
}
})
;app.controller('AddTendorController',function($scope,$rootScope,$state,Util,Constants,ApiCall,EnvService,$timeout,$cookieStore,$localStorage,AppModel){

$scope.addTendorInit = function() {
  $scope.tender = {};
  $scope.tender.FileData = {};
  $scope.fileData = {};
  if(!AppModel.getSetting()) {
    ApiCall.getCommonSettings(function(response) {
      AppModel.setSetting(response.Data);
      $scope.tender.tenderTypes = AppModel.getSetting('tenderType');
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
    })
  }
  else {
    $scope.tender.tenderTypes = AppModel.getSetting('tenderType');
  }
}
$scope.fileSelected = function(fileName) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>",window.fileData);
  $scope.tender.FileData = window.fileData;
}
$scope.addTendor = function(addTendorForm,tender) {
  tender.tokenID = $localStorage[Constants.getTokenKey()];
  tender.actType = "I";
  tender.tenderType = tender.tenderType.typeName;
  console.log(JSON.stringify(tender));
  $rootScope.showPreloader = true;
  ApiCall.postTendor(tender,function(res) {
    $state.go("tenderList");
    $rootScope.showPreloader = false;
    Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
  }, function(err) {
    $rootScope.showPreloader = false;
    Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
  })
}
$scope.goTenderAssign = function(){
  $state.go('tender_assign');
}
$scope.gotoTenderCheck = function(){
  $state.go('tender_checklist');
}
})
;app.controller('TenderAssignController', function($scope, $rootScope, $state, $stateParams, ApiCall, EnvService, $timeout, $cookieStore, $localStorage,Constants,Util) {
  $scope.init = function() {
    if(!$stateParams.tender)
      $state.go("tenderList");
    $scope.isView = true;
    $scope.tender = $stateParams.tender;
    // loading vendorList
    $rootScope.showPreloader = true;
    var vendorData = {};
    vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.type = "GET_VENDOR_ALL";
    ApiCall.getVendor(vendorData,function(res) {
      $scope.tender.vendors = res.Data;
      $rootScope.showPreloader = false;
    },function(err) {
      $rootScope.showPreloader = false;
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
    })
  }
})
;app.controller('TenderDetailsController', function($scope, $rootScope, $state,$uibModal, $stateParams, ApiCall,Util, EnvService, $timeout, $cookieStore, $localStorage) {

    $scope.init = function() {
        $scope.isInit = false;
        $stateParams.action = $stateParams.action || "view"; // setting default action as view
        $scope.isView = $stateParams.action == "view" ? true : false;
        var data = {
            tenderId: $stateParams.tenderId
        }
        $rootScope.showPreloader = true;
        ApiCall.getTendor(data, function(res) {

            $scope.tender = res.Data;
            // Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
            $scope.isInit = true;
            $rootScope.showPreloader = false;
            // delete boq columns
            // for(var i in $scope.tender.boqData) {
            //   angular.forEach($scope.tender.boqData[i],function(v,k) {
            //     var temp = ['itemDescription','quantity','units','totalAmountWithoutTaxes'];
            //     if(temp.indexOf(k)  == -1)
            //       delete $scope.tender.boqData[i][k];
            //   })
            // }
        }, function(err) {
            Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
            $rootScope.showPreloader = false;
        })
    }
    $scope.onEditTendor = function(action, tender) {
        $state.go("tenderDetails", {
            tenderId: tender.tenderId,
            action: action
        });
    }
    $scope.showBoq = function() {
        $uibModal.open({
            animation: true,
            size: 'lg',
            controller: "boqController",
            templateUrl:"src/views/Tender/modals/boqDetailsModal.html",
            resolve:{
              tender :function() {
                return $scope.tender
              }
            }
        });
    }
    $scope.updateTender = function(tender) {
      tender.actType = "U";
      tender.tenderType = tender.tenderType.typeName;
      console.log(JSON.stringify(tender));
      $rootScope.showPreloader = true;
      ApiCall.postTendor(tender,function(res) {
        $state.go("tenderList");
        $rootScope.showPreloader = false;
        Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
      }, function(err) {
        $rootScope.showPreloader = false;
        Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
      })
    }
})

/**
 * boqController
 * Info : used to show the boq data in the modal
 */
app.controller('boqController', function ($scope,$uibModalInstance,tender,Util,ApiCall,$uibModal) {
  $scope.boqUpdateArr = [];
  $scope.boqData = tender.boqData;
  // used to update the boq data of the indivisual row
  $scope.updateBoqData = function(){
    ApiCall.postBOQHistory($scope.boqUpdateArr,function(response) {
      Util.alertMessage(response.Status.toLocaleLowerCase(),response.Message);
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
    })
  }
  $scope.showBoqHistory = function(){
    $uibModal.open({
        animation: true,
        size: 'lg',
        controller: "boqHistoryController",
        templateUrl:"boqHistoryModal.html",
        resolve:{
          tenderId :function() {
            return tender.tenderId
          }
        }
    });
  }
  $scope.focusEdit = function(boq,$event) {
    // reset the edit mode except the selected one
    angular.forEach($scope.boqData,function(boqData) {
      boqData == boq ? boq.isEdit = true : boqData.isEdit = false;
    })
  }
  $scope.getBoqHeaders = function() {
    var temp = $scope.boqData[0];
    var arr = []
    // getting headers as keys present in the boq details array
    angular.forEach(temp, function(index,value){
      arr.push(value);
    })
    return arr;
  }
  $scope.updateAmount = function(boq) {
    boq.isEdit = false;
    boq.totalAmountWithoutTaxes = boq.quantity*boq.estimateRate;
    $scope.boqUpdateArr.push(boq); // update the array that will save in batch
  }
  $scope.ok = function () {
    $uibModalInstance.close();
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


/**
 * boqHistoryController
 * Info : used to show the boq history updated by different users
 */
app.controller('boqHistoryController', function ($scope,$uibModalInstance,tenderId,ApiCall,NgTableParams,Util) {
  var data = {
    tenderId : tenderId
  }
  $scope.boqHistory = [];
  $scope.updateUserDetails = function(data) {
    // close all the pop up
    angular.forEach($scope.boqHistory,function(v,k) {
      if(data == v) {
        v.isOpen = !v.isOpen;
      }
      else {
        v.isOpen = false;
      }
    })
    $scope.userDetails = data;
  }
  ApiCall.getBOQHistory(data,function(response) {
    $scope.boqHistory = response.Data;
    // $scope.boqHistory = response.Data;
    $scope.tableParams = new NgTableParams();
    $scope.tableParams.settings({
      dataset: response.Data
    });
    Util.alertMessage(response.Status.toLocaleLowerCase(),response.Message);
  },function(err) {
    Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
  })
  $scope.ok = function () {
    $uibModalInstance.close();
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
;app.controller('TenderListController', function($scope, $rootScope, $state, ApiCall, EnvService, $timeout, $cookieStore, $localStorage,NgTableParams) {

    $scope.tenderListInit = function() {
      $rootScope.showPreloader = true;
      ApiCall.getTendor(function(res) {

        //$scope.tenders = res.Data;
        $scope.tableParams = new NgTableParams();
        $scope.tableParams.settings({
        dataset: res.Data
      });
        // Util.alertMessage(res.Status.toLocaleLowerCase(),res.Message);
        $rootScope.showPreloader = false;
      }, function(err) {
        Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
        $rootScope.showPreloader = false;
      })
    }
    $scope.onAction = function(action,tender) {

      switch (action) {
        case 'assign':
          $state.go("tenderAssign",{tender:tender});
          break;
        case 'view':
        case 'edit':
          $state.go("tenderDetails",{tenderId:tender.tenderId,action:action});
          break;
        case 'freeze':
          ApiCall.freezeTender({tenderId:tender.tenderId},function(response) {
            Util.alertMessage(Events.eventType.success, response.Message);
          },
          function(err) {
            Util.alertMessage(Events.eventType.error, err.Message);
          }
        )
          break;
        case 'milestone':
          $state.go("tender_milestone",{tenderId:tender.tenderId})
          break;
        default:

      }

    }
})
;app.controller('TenderMilestoneController', function($scope, $rootScope, $state, $stateParams,ApiCall,Util,Events , EnvService, $timeout, $cookieStore, $localStorage) {

    $scope.init = function() {
        $scope.tenderMilestone = {};
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
;app.controller('UserController', function($scope, $rootScope, $state,$stateParams, UserService, UtilityService,Util,$localStorage, Constants,ApiCall,Events) {
    // $scope.UserService = UserService;
    $rootScope.$on(Events.userLogged,function() {
      if(!$scope.user)
        $scope.user = UserService.getUser();
    });
    $scope.init = function() {
        $scope.user = UserService.getUser();
        // here this is kept in $rootScope as this controller is a shared one
        //the this value getting lost on each controller load
        $rootScope.sideBar = UserService.getSideBarInfo();
        $scope.userTabs = [{
            heading: "View Profile",
            active: true
        }, {
            heading: "Edit Profile",
            active: false
        }, {
            heading: "Change Password",
            active: false
        }, ]
        $scope.currTab = 0;
        // loading user information in case of the edituser, view user
        if($stateParams.userId){
          $scope.isView = $stateParams.action == 'edit' ? false : true;
          var obj = {
            userId:$stateParams.userId,
            TokenId: $localStorage[Constants.getTokenKey()]
          }
          ApiCall.getUser(obj,function(response) {
            $scope.user = response.Data[0];
          },function(err) {
            Util.alertMessage(Events.eventType.error,err.Message);
          })

        }
    }
    $scope.updateActiveClass = function(index){
      angular.forEach($scope.sideBar,function(v,k) {
        if(index == k)
          v.activeClass = 'active';
        else {
            v.activeClass = '';
        }
      })
    }
    $scope.tabChange = function(tabPos) {
        $scope.currTab = tabPos;
    }
    $scope.changePassword = function() {
        var obj = {
            UserId: $scope.user.userId,
            TokenId: $localStorage[Constants.getTokenKey()],
            OldPassword: $scope.user.oldPassword,
            NewPassword: $scope.user.newPassword,
        }
        UtilityService.showLoader();
        UserService.serviceCall().getUser(obj, function(response) {
                UtilityService.hideLoader();
                Util.alertMessage("success", "Password Changed");
            },
            function(error) {
                UtilityService.hideLoader();
                Util.alertMessage("danger", "Password Change Error");
            }
        )
    }
    /**
     * add user starts
     *
     */
     $scope.addUserInit = function() {
       $rootScope.showPreloader = true;
       ApiCall.getDesignation({TokenId:$localStorage[Constants.getTokenKey()]},function(res) {
         $scope.designations = res.Data;
         $rootScope.showPreloader = false;
       },function(err) {
         Util.alertMessage("danger", err.Message || "Error in Login");
         $rootScope.showPreloader = false;
       })
     }
     $scope.addUser = function(form) {
       $scope.user.designationId = $scope.user.designation.designationId;
       delete $scope.user['designation'];
       console.log("user ",$scope.user);
       $scope.user.tokenId = $localStorage[Constants.getTokenKey()];
       ApiCall.postUser($scope.user,function(res) {
         Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
         $state.go("UserList");
       },function(err) {
         Util.alertMessage(res.Status.toLocaleLowerCase(), err.Message || "Error in Login");
       })
     }
    /**
     * add user ends
     *
     */


    /**
     * view user starts
     *
     */


    /**
     * view user ends
     *
     */


})
;app.controller('UserDetailsController', function($scope, $rootScope, $state,$stateParams, AppModel,ApiCall,UserService,Events, UtilityService,Util,$localStorage, Constants) {
    // $scope.UserService = UserService;
    $scope.init = function() {
      $scope.isEdit = $stateParams.action == "edit" ? true : false;
      // get the designation to update
      if($scope.isEdit){
        if(!AppModel.getSetting()) {
          ApiCall.getCommonSettings(function(response) {
            AppModel.setSetting(response.Data);
            $scope.designations = AppModel.getSetting('designation');

          },function(err) {
            Util.alertMessage(err.Status.toLocaleLowerCase(),err.Message);
          })
        }
        else {
          $scope.designations = AppModel.getSetting('designation');
        }
      }
      var obj = {
        TokenId:$localStorage[Constants.getTokenKey()],
        UserId:$stateParams.userId
      }
      $rootScope.showPreloader = true;
        ApiCall.getUser(obj,function(response) {
          $scope.user = response.Data;
          $rootScope.showPreloader = false;
          // setting the user designation
          for(var i in $scope.designations){
            if($scope.user.designation == $scope.designations[i].designationName){
              $scope.user.designation = $scope.designations[i];
            }
          }
        },
        function(err){
          Util.alertMessage(Events.eventType.error,err.message);
          $rootScope.showPreloader = false;
        }
      )
    }
    // update user info as admin
    $scope.updateUser = function(form,user) {
      user.designationId = user.designation.designationId;
      delete user['designation'];
      user.actType = 'U';
      ApiCall.postUser(user,function(res) {
        Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
        $state.go("UserList");
      },function(err) {
        Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message || "Error in Login");
      })
    }


})
;app.controller('UserListController', function($scope, $rootScope, $state, NgTableParams,$uibModal,ApiCall,UserService,Events, UtilityService,Util,$localStorage, Constants) {
    // $scope.UserService = UserService;
    $scope.init = function() {
      $scope.userList = [];
      var obj = {
        TokenId:$localStorage[Constants.getTokenKey()],
        UserId:""
      }
      $rootScope.showPreloader = true;
        ApiCall.getUser(obj,function(response) {
          //$scope.userList = response.Data;
          $rootScope.showPreloader = false;
          $scope.tableParams = new NgTableParams();
          $scope.tableParams.settings({
          dataset: response.Data
        });
        },
        function(err){
          Util.alertMessage(Events.eventType.error,err.Message);
          $rootScope.showPreloader = false;
        }
      )
    }
    $scope.getUserDetails = function(data) {
      $state.go("userDetails",data);
    }
    $scope.openDeleteModal = function(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'deleteModal.html',
        controller: 'deleteModalCtrl',
        size: 'md',
        resolve: {
          user: function () {
            return user;
          }
        }
      });
    }


})

app.controller('deleteModalCtrl', function ($scope, $uibModalInstance,user,Util,ApiCall,$state,Events ) {
  $scope.user = user;
  $scope.ok = function () {
    // calling service to delete user
    var obj = {
      actType:'D',
      userId:user.userId
    }
    ApiCall.postUser(obj,function(response) {
      Util.alertMessage(Events.eventType.success,response.Message);
      $uibModalInstance.close();
      $state.reload();
    },function(err) {
      Util.alertMessage(Events.eventType.error,err.Message);
      $uibModalInstance.close();
    })

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
;app.controller('EditVendorController',function($scope,$rootScope,$state,$stateParams,Constants,EnvService,$timeout,$cookieStore,$localStorage,ApiCall,Util){
  $scope.initEditVendor = function() {
    if(!$stateParams.vendor)
      $state.go("VendorList"); // move to vendor list if no vendor selected to edit data
    else {
      $scope.vendor = $stateParams.vendor;
    }
  }
  $scope.updateVendor = function(vendorDetails,vendor) {
    console.log(vendorDetails,vendor);
  }
})
;app.controller('VendorDetailsController',function($scope,$rootScope,$state,$stateParams,Constants,EnvService,$timeout,$cookieStore,$localStorage,ApiCall,Util){
  $scope.init = function() {
    if(!$stateParams.vendor)
      $state.go("VendorList"); // move to vendor list if no vendor selected to edit data
    else {
      $scope.isEdit = $stateParams.action == 'edit' ? true : false;
      $scope.vendor = $stateParams.vendor;
    }
  }
  $scope.updateVendor = function(vendorDetails,vendor) {
    console.log(vendorDetails,vendor);
    vendor.actType = "U";
    $rootScope.showPreloader = true;
    ApiCall.postVendor(vendor,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      $state.go("VendorList");
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
  }
})
;app.controller('VendorController',function($scope,$rootScope,$state,Constants,$uibModal,NgTableParams,EnvService,$timeout,$cookieStore,$localStorage,ApiCall,Util){
  /***************************************************************************/
  /**************************This is use to show a pop up****************************/
  /***************************************************************************/
  $scope.onDeleteVendor = function (vendor) {

    $scope.selectedVendor = vendor;
    $scope.open();
  };
  $scope.open = function(){
      $scope.showModal = true;
  }
  /***************************************************************************/
  /**************************This is use to hide a pop up****************************/
  /***************************************************************************/
  $scope.ok = function () {
    console.log("vendor to be deleted",$scope.selectedVendor);
    var vendorData = {};
    vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.vendorId = $scope.selectedVendor.vendorId;
    $rootScope.showPreloader = true;
    ApiCall.deleteVendor(vendorData,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      $scope.initVenderList();
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
    $scope.showModal = false;
    $scope.selectedVendor = null;
  };
  /***************************************************************************/
  /**************************This is use to hide a pop up****************************/
  /***************************************************************************/
  $scope.cancel = function () {
    console.log("vendor to be deleted cancelled ",$scope.selectedVendor);
    $scope.selectedVendor = null;
     $scope.showModal = false;
  };
  /***************************************************************************/
  /**************************This is use to go to edit vendor page****************************/
  /***************************************************************************/

  $scope.onAction = function(action,vendor) {
    switch (action) {
      case 'view':
      case 'edit':
        $state.go("vendorDetails",{vendor:vendor,action:action})
        break;
      case 'delete':
        // call service to delete
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'deleteVendorModal.html',
          controller: 'deleteVendorModalCtrl',
          size: 'md',
          resolve: {
            vendor: function () {
              return vendor;
            }
          }
        });
        break;
      default:

    }
  }
  $scope.initVenderList = function(){
    var vendorData = {};
    vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.actType = "GET_VENDOR_ALL";
    $rootScope.showPreloader = true;
    ApiCall.getVendor(vendorData,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      // $scope.vendors = res.Data;
      $scope.tableParams = new NgTableParams();
        $scope.tableParams.settings({
        dataset: res.Data
      });
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
  }
  $scope.addVendor = function(addVendorForm,vendorData){

    vendorData.tokenId = $localStorage[Constants.getTokenKey()];
    vendorData.type = "I";
    $rootScope.showPreloader = true;
    ApiCall.postVendor(vendorData,function(res) {
      Util.alertMessage(res.Status.toLocaleLowerCase(), res.Message);
      $state.go("VendorList");
      $rootScope.showPreloader = false;
    },function(err) {
      Util.alertMessage(err.Status.toLocaleLowerCase(), err.Message);
      $rootScope.showPreloader = false;
    })
  }
})


app.controller('deleteVendorModalCtrl', function ($scope, $uibModalInstance,vendor,Util,ApiCall,$state,Events ) {
  $scope.vendor = vendor;
  $scope.ok = function () {
    // calling service to delete user
    var obj = {
      actType:'D',
      vendorId:vendor.vendorId
    }
    ApiCall.postVendor(obj,function(response) {
      Util.alertMessage(Events.eventType.success,response.Message);
      $uibModalInstance.close();
      $state.reload();
    },function(err) {
      Util.alertMessage(Events.eventType.error,err.Message);
      $uibModalInstance.close();
    })

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
;app.directive(
        'dateInput',
        function(dateFilter) {
            return {
                require: 'ngModel',
                template: '<input type="date"></input>',
                replace: true,
                link: function(scope, elm, attrs, ngModelCtrl) {
                    ngModelCtrl.$formatters.unshift(function (modelValue) {
                        return dateFilter(modelValue, 'yyyy-MM-dd');
                    });

                    ngModelCtrl.$parsers.unshift(function(viewValue) {
                        return new Date(viewValue);
                    });
                },
            };
    });
;app.directive('dateViewer', function () {
    return {
        require: "ngModel",
        restrict: 'EA',
        templateUrl: 'src/directive/views/datepicker.html',
        controller:'dateViewerController',
        scope:{
          ngModel:'=',
          minDate:'=',
          className:"="
        }
    };
})
.controller("dateViewerController",["$scope",function($scope) {
  $scope.open2 = function() {
   $scope.popup2.opened = true;
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];
  $scope.popup2 = {
    opened: false
  };
  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
  $scope.open = function() {
   $scope.popup.opened = true;
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];
  $scope.popup = {
    opened: false
  };
  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
}])
;app.directive('fileSelect', [function () {
    return {
        restrict:"EA",
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
              console.log("attrs  ",attrs.fileData);
               var fr = new FileReader();
                var file = evt.target.files[0];
                fr.onloadend = function () {
                   var result = this.result;
                  //  var hex = "";
                  //  for (var i = 0; i < this.result.length; i++) {
                  //      var byteStr = result.charCodeAt(i).toString(16);
                  //      if (byteStr.length < 2) {
                  //          byteStr = "0" + byteStr;
                  //      }
                  //      hex += " " + byteStr;
                  //  }
                   window.fileData = {
                     FileName:file.name,
                     InputStream:result.split(";base64,")[1]
                   }
                   scope.fileSelected(window.fileData);
               };
               fr.readAsDataURL(file);

            });
        },
        scope:{
          fileSelected :"&",
          fileData :"=",
        }
    }
}]);
;app.directive('history', function () {
    return {
        restrict: 'EA',

        link: function(scope, element, attrs) {
            $(element[0]).on('click', function() {
                history.back();
                scope.$apply();
            });

        }
    };
});
;app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
;app.filter('getShortName', function () {
    return function (value) {
      if(value){
        var temp = angular.copy(value);
        temp = temp.split(" ");
        temp = temp[0].charAt(0)+temp[temp.length-1].charAt(0);
        return temp.toUpperCase();
      }
    };
});
;angular.module('Authentication', [])
    .factory('LoginService',function($http,$resource,ApiGenerator) {
      return $resource('/',null, {
        login: ApiGenerator.getApi('login'),
        logout: ApiGenerator.getApi('logout'),
        token: ApiGenerator.getApi('token'),
        forgotPassword: ApiGenerator.getApi('forgotPassword')
      });
    })
    .controller('LoginController',function($http,$scope,$state,$rootScope,LoginService,UtilityService,Events,$localStorage,Constants,UserService,Util,ApiGenerator,validationService) {
      $scope.init = function(){
        $scope.user = {};
        if($localStorage[Constants.getIsRemember()]){
          $scope.user.userId = $localStorage[Constants.getUsername()];
          $scope.user.Password = UtilityService.decode($localStorage[Constants.getPassword()]);
          $scope.user.remember = $localStorage[Constants.getIsRemember()];
        }
        $scope.validationService = validationService;
        $scope.isInit = true; // this flag used to load the form after controller init
      }
      $scope.login = function(loginfrm) {
        // $rootScope.loggedin = $localStorage[Constants.getLoggedIn()] = true;
        // $state.go('dashboard');
        console.log(loginfrm);
        ApiGenerator.getApi('login');
        LoginService.login(JSON.stringify($scope.user),function(response) {
          UtilityService.showLoader();
          if(response.StatusCode == 200){
            UtilityService.hideLoader();
            $localStorage[Constants.getTokenKey()] = response.Data.tokenId;
            $localStorage[Constants.getLoggedIn()] = true;
            $rootScope.loggedin = $localStorage[Constants.getLoggedIn()];
            UserService.setUser(response.Data);
            // saving / removing remember me data
            if($scope.user.remember){
              $localStorage[Constants.getUsername()] = $scope.user.userId;
              $localStorage[Constants.getPassword()] = UtilityService.encode($scope.user.Password);
              $localStorage[Constants.getIsRemember()] = true;
            }
            else{
              delete $localStorage[Constants.getUsername()];
              delete $localStorage[Constants.getPassword()];
              delete $localStorage[Constants.getIsRemember()];
            }
            $state.go('dashboard');
          }
          else{
            Util.alertMessage("danger", response.Message || "Error in Login");
            // $rootScope.$emit(Events.errorInLogin,{type:Events.eventType.error,data:response});
          }
        },function(err) {
          // $state.go('login');
          $rootScope.$emit(Events.errorInLogin,{type:Events.eventType.error});
        })
      }
      $scope.logout = function() {
          LoginService.logout({userId:UserService.getUser().userId},function(response) {
            UserService.unsetUser();
            Util.alertMessage("success",response.Message);
            $rootScope.loggedin = false;
            $state.go('login');
          },function(err) {
            Util.alertMessage("danger",err.Message);
          })

      }
      $scope.forgotPassword = function(email) {
          var obj = {
            "userId": 10000,
            "name": "Mukhtar",
            "email": "rajendrasahoodbpb@gmail.com"
          }
          LoginService.forgotPassword(obj,function(response) {
            Util.alertMessage("success",response.Message);
          },function(err) {
            Util.alertMessage("danger",response.Message);
          })

      }
    })
;
;angular.module('EventHandler', [])
    .factory('Events', function($rootScope) {
      var eventType = {
        "success":"success",
        "error":"error",
        "warning":"warning",

      }
      return{
        "eventType"              : eventType,
        "validationFieldMissing" :"validation Field Missing",
        "validationHintMissing" :"validation Hint Missing",
        "successInLogin"          : "success In Login",
        "successInLogout"          : "success In Logout",
        "errorInLogin"          : "error In Login",
        "errorInLogout"          : "errorInLogout",
        "roleError"          : "role in Error",
        "errorSideBarData"          : "error Side Bar Data",
        "userLogged"          : "User Logged",
        "selectTender"          : "Please select tender",
      }
    })
;
;angular.module('validation', [])
    // .constant('MODULE_VERSION', '0.0.3')
    // .value('defaults', {
    //     foo: 'bar'
    // })
    // .directive('directiveName', function() {/* stuff here */})
    .factory('validationService', function($rootScope,Events) {
      var validationMessages = {
        'required' : {
          // this will take as errorType ,%fieldName% and type** to generate message
          'type1' : 'Field %fieldName% can not be blank',
          'type2' : 'Please enter value for %fieldName% '
        },
        'invalid' : {
          // this will take as errorType ,%fieldName% and type** and %hint% as optional to generate message
          'type1' : 'Invalid Entry for %fieldName%',
          'type2' : 'Please enter valid input for %fieldName% ',
          'type3' : 'Please enter valid input for %fieldName% with values %hint%',
        },
      }
      return{
        getValidationMessage : function(errorType,type,fieldName,hint) {
          if(!errorType || !fieldName || !type){
            $rootScope.$emit(Events.validationFieldMissing,{type:Events.eventType.warn});
            return;
          }
          else if (!validationMessages[errorType] || !validationMessages[errorType]['type'+type]) {
            $rootScope.$emit(Events.validationFieldInvalid,{type:Events.eventType.warn});
            return;
          }
          else if(validationMessages[errorType]['type'+type].indexOf('%hint%') != -1 && !hint){
                $rootScope.$emit(Events.validationHintMissing,{type:Events.eventType.warn});
                return;
          }
          // prepare the message
          var message = validationMessages[errorType]['type'+type] ;
          return message.replace("%fieldName%",fieldName).replace("%hint%",hint);
        }
      }
    })
;
;angular.module('WebService', [])
    .factory('API', function($http, $resource, EnvService) {
        return {
            login: {
                "url": "/api/Login",
                "method": "POST",
                // "isArray" : true
                "headers": {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

            },
            logout: {
                url: "/api/User",
                method: "POST"
            },
            token: {
                "url": "/api/User",
                "method": "GET",
                "Content-Type": "application/json",
                // "isArray" : true
            },
            getUser: {
                "url": "/api/User",
                "method": "GET",
                "Content-Type": "application/json",
                // "isArray" : true
            },
            forgotPassword: {
                "url": "/api/ForgotPassword",
                "method": "POST",
                "Content-Type": "application/json",
                // "isArray" : true
            },
            // getUsers: {
            //     "url": "/api/User",
            //     "method": "GET",
            //     "Content-Type": "application/json",
            //     // "isArray" : true
            // },
            addUser: {
                "url": "/api/User",
                "method": "POST",
                "Content-Type": "application/json",
            },
            postUser: {
                "url": "/api/User",
                "method": "POST",
                "Content-Type": "application/json",
            },
            // getUser: {
            //     "url": "/api/User",
            //     "method": "POST",
            //     "Content-Type": "application/json",
            // },
            postVendor: {
                "url": "/api/Vendor",
                "method": "POST",
                "Content-Type": "application/json",
            },
            getVendor: {
                "url": "/api/Vendor",
                "method": "POST",
                "Content-Type": "application/json",
            },
            deleteVendor: {
                "url": "/api/Vendor",
                "method": "DELETE",
                "Content-Type": "application/json",
            },
            getDesignation: {
                "url": "/api/Designation",
                "method": "GET",
                "Content-Type": "application/json",
            },
            postTendor: {
                "url": "/api/Tendor",
                "method": "POST",
                "Content-Type": "application/json",
            },
            getTendor: {
                "url": "/api/Tendor",
                "method": "GET",
                "Content-Type": "application/json",
            },
            freezeTender: {
                "url": "/api/TenderFreeze",
                "method": "POST",
                "Content-Type": "application/json",
            },
            getCommonSettings: {
                "url": "/api/CommonSettings",
                "method": "GET",
                "Content-Type": "application/json",
            },
            postBOQHistory: {
                "url": "/api/BOQHistory",
                "method": "POST",
                "Content-Type": "application/json",
            },
            getBOQHistory: {
                "url": "/api/BOQHistory",
                "method": "GET",
                "Content-Type": "application/json",
            },


        }
    })
    .factory('ApiGenerator', function($http, $resource, API, EnvService) {
        return {
            getApi: function(api) {
                var obj = {};
                obj = angular.copy(API[api]);
                obj.url = EnvService.getBasePath() + obj.url; // prefix the base path
                return obj;
            }
        }
    })
    .factory('ApiCall', function($http, $resource, API, EnvService,ApiGenerator) {

          return $resource('/',null, {
            getDesignation: ApiGenerator.getApi('getDesignation'),
            postUser: ApiGenerator.getApi('postUser'),
            getUser: ApiGenerator.getApi('getUser'),
            postVendor: ApiGenerator.getApi('postVendor'),
            getVendor: ApiGenerator.getApi('getVendor'),
            deleteVendor: ApiGenerator.getApi('deleteVendor'),
            postTendor: ApiGenerator.getApi('postTendor'),
            getTendor: ApiGenerator.getApi('getTendor'),
            freezeTender: ApiGenerator.getApi('freezeTender'),
            getCommonSettings: ApiGenerator.getApi('getCommonSettings'),
            postBOQHistory: ApiGenerator.getApi('postBOQHistory'),
            getBOQHistory: ApiGenerator.getApi('getBOQHistory'),
          });

    })

;
;app.factory('AppModel',function($rootScope,$http,$localStorage,$resource,ApiGenerator,Events,Constants){
  var appModel = {};
  appModel.getSetting = function(key) {
    if(!appModel.setting)
      return false;
    else if(key)
      return appModel.setting[key] ;
    else {
      var isSetting = appModel.setting ? true : false;
      return isSetting;
    }
  }
  appModel.setSetting = function(setting) {
    appModel.setting = setting;
  }
  return appModel;
})
;app.factory('EnvService',function($http,CONFIG,$localStorage){
  var envData = env = {};
  return{
    setEnvData: function (data) {
      envData = data[data.env];
    },
    getEnvData: function () {
      return envData;
    },
    getBasePath: function (env) {
      return this.getEnvData()['basePath']
    }

  }
})
;app.factory('UserService',function($rootScope,$http,$localStorage,$resource,ApiGenerator,Events,Constants){

  var user = {};
  var UserService = {};
  var roles = {
    "10000":"superAdmin",
  }
  // side bar details mapped data with the degignation id
  var sideBar = {
    '10000' :[
      {
        "label" : "Dashboard",
        "state" : "dashboard",
        "fClass" : "fa fa-home",
      },
      {
        "label" : "Tender Management",
        "state" : "tenderList",
        "fClass" : "fa fa-home",
      },
      {
        "label" : "User Management",
        "state" : "UserList",
        "fClass" : "fa fa-th-large",
      },
      {
        "label" : "Vendor Management",
        "state" : "VendorList",
        "fClass" : "fa fa-home",
      },
      {
        "label" : "Tender Milestone",
        "state" : "tender_milestone",
        "fClass" : "fa fa-th-large",
      },
    ]
  }
  UserService.getRole = function(roleId) {
    var user = this.getUser();
    var role = roles[this.getUser().designationId];
    if(!role)
    {
      // emit event to terminate redirect to login
      $rootScope.$emit(Events.eventType.error,{message:Events.roleError})
    }
    else {
      return role;
    }
  };

  UserService.getUser = function() {
    return user;
  };
  UserService.setUser = function(userData) {
    user = userData
  };
  UserService.unsetUser = function() {
    $localStorage[Constants.getTokenKey()] = null;
    $localStorage[Constants.getLoggedIn()] = false;
    $rootScope.loggedin = $localStorage[Constants.getLoggedIn()];
    this.setUser(null);
  };
  // this is used to call the web serviceCall
  UserService.serviceCall = function() {
    return $resource('/',null, {
      getUser: ApiGenerator.getApi('getUser'), // get user can be called in many form
      getUsers: ApiGenerator.getApi('getUsers'), // get user can be called in many form
      addUser: ApiGenerator.getApi('addUser'), // get user can be called in many form
    });
  };
  // used to get the side bar details according to user
  UserService.getSideBarInfo = function() {
    var sideBarInfo = sideBar[this.getUser().designationId];
    if(!sideBarInfo)
    {
      // emit event to terminate redirect to login
      $rootScope.$emit(Events.eventType.error,{message:Events.errorSideBarData})
    }
    else {
      return sideBarInfo;
    }

  };
  return UserService;
})
;app.factory("UtilityService", function($http,$resource,$rootScope,$localStorage,Constants) {
  var userSettings;
  var selectedRooms = [];
  var selectedTransaction;
  // Create Base64 Object
  var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

  var getSelectedIds = function(array,prop,matchValue){
    var arr = [];
    angular.forEach(array,function(value,key) {

      if(value[prop] == matchValue)
        arr.push(value._id);
    });
    return arr;
  };
  /**
   * functionName :getSelectedItemByProp
   * Info : this is used to give the required property on matching the condition given and give the result in array
   * input :
        @array - input array
        @prop - prop to be parse (in case of null skip the conditon checking and loop for all iterration)
        @matchValue - condition to match @prop
        @returnProp - property to be returned
   * output : array
   * createdDate - 5-9-2016
   * updated on -  5-9-2016 // reason for update
   */
  var getSelectedItemByProp = function(array,prop,matchValue,returnProp){
    var arr = [];
    angular.forEach(array,function(value,key) {

      if(prop && value[prop] == matchValue)
        arr.push(value[returnProp]);
      else if (!prop) {
        // in case of the match property not mentioned then add the Required property
        arr.push(value[returnProp]);
      }
    });
    return arr;
  };
  var getSelectedItemByID = function(array,prop,matchValue,returnProp){
    var arr = [];
    angular.forEach(array,function(value,key) {

      if(value[prop] == matchValue)
        arr.push(value[returnProp]);
    });
    return arr;
  };
  var getUserSettings = function(){
    return userSettings;
  };
  var setUserSettings = function(obj){
    userSettings = obj;
  }
  var resetForm = function(form){
    if(!form)
    return;
    form.$setPristine();
    form.$setUntouched();
  }
  var encode = function(data)
  {
    var encode = Base64.encode(data);
    return encode;
  }

  var decode = function(data)
  {
      var decode = Base64.decode(data);
      return decode;
  }
  var setSelectedRoom = function(roomList){
    selectedRooms = roomList;
  }
  var getSelectedRoom = function(){
    return selectedRooms
  }
  var setTransaction = function(transaction){
    selectedTransaction = transaction;
  }
  var getTransaction = function(){
    return selectedTransaction
  }
  var showLoader = function(){
    $rootScope.showPreloader = true;
  }
  var hideLoader = function(){
    $rootScope.showPreloader = false;
  }
  return{
    getSelectedIds:getSelectedIds,
    getSelectedItemByProp:getSelectedItemByProp,
    getSelectedItemByID:getSelectedItemByID,
    getUserSettings    : getUserSettings,
    setUserSettings    : setUserSettings,
    resetForm          : resetForm,
    encode             :encode,
    decode             :decode,
    getSelectedRoom    :getSelectedRoom,
    setSelectedRoom    :setSelectedRoom,
    setTransaction     :setTransaction,
    getTransaction     :getTransaction,
    showLoader         :showLoader,
    hideLoader         :hideLoader,
  }
})