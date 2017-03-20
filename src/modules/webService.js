angular.module('WebService', [])
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
                url: "/api/LogOut",
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
            // deleteUser: {
            //     "url": "/api/User",
            //     "method": "DELETE",
            //     "Content-Type": "application/json",
            // },
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
                "method": "GET",
                "Content-Type": "application/json",
            },
            getMilestone: {
                "url": "/api/TendorMileStone",
                "method": "GET",
                "Content-Type": "application/json",
            },
            posttMilestone: {
                "url": "/api/TendorMileStone",
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
            postDesignation: {
                "url": "/api/Designation",
                "method": "POST",
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
            postVendorCheckList: {
                "url": "/api/VendorCheckList",
                "method": "POST",
                "Content-Type": "application/json",
            },
            getVendorCheckList: {
                "url": "/api/VendorCheckList",
                "method": "GET",
                "Content-Type": "application/json",
            },
            postProjectMileStone: {
                "url": "/api/ProjectMileStone",
                "method": "POST",
                "Content-Type": "application/json",
            },
            getProjectMileStone: {
                "url": "/api/ProjectMileStone",
                "method": "GET",
                "Content-Type": "application/json",
            },
            getAuthentication: {
                "url": "/api/Authentication",
                "method": "GET",
                "Content-Type": "application/json",
                // "isArray" : true
            },
            postAuthentication: {
                "url": "/api/Authentication",
                "method": "POST",
                "Content-Type": "application/json",
            },
            getServiceList: {
                "url": "/api/ServiceList/",
                "method": "GET",
                "Content-Type": "application/json",
                 "isArray" : true
            },
            ChangePassword: {
                "url": "/api/ChangePassword",
                "method": "POST",
                "Content-Type": "application/json"
            },
            postProjectMileStoneReview: {
                "url": "/api/ProjectMileStoneReview",
                "method": "POST",
                "Content-Type": "application/json"
            },
            getProjectMileStoneReview: {
                "url": "/api/ProjectMileStoneReview",
                "method": "GET",
                "Content-Type": "application/json"
            },
            getDashboard: {
                "url": "/api/dashboard",
                "method": "GET",
                "Content-Type": "application/json"
            },
            postTenderAssign: {
                "url": "/api/TenderAssignToVendor",
                "method": "POST",
                "Content-Type": "application/json"
            },


        }
    })
    .factory('ApiGenerator', function($http, $resource, API, EnvService) {
        return {
            getApi: function(api) {
                var obj = {};
                obj = angular.copy(API[api]);
                // console.log("obj  ",obj,api);
                obj.url = EnvService.getBasePath() + obj.url; // prefix the base path
                return obj;
            }
        }
    })
    .factory('ApiCall', function($http, $resource, API, EnvService,ApiGenerator) {

          return $resource('/',null, {
            login: ApiGenerator.getApi('login'),
            logout: ApiGenerator.getApi('logout'),
            token: ApiGenerator.getApi('token'),
            forgotPassword: ApiGenerator.getApi('forgotPassword'),
            getDesignation: ApiGenerator.getApi('getDesignation'),
            postUser: ApiGenerator.getApi('postUser'),
            // deleteUser: ApiGenerator.getApi('deleteUser'),
            getUser: ApiGenerator.getApi('getUser'),
            postVendor: ApiGenerator.getApi('postVendor'),
            getVendor: ApiGenerator.getApi('getVendor'),
            deleteVendor: ApiGenerator.getApi('deleteVendor'),
            postTendor: ApiGenerator.getApi('postTendor'),
            getTendor: ApiGenerator.getApi('getTendor'),
            freezeTender: ApiGenerator.getApi('freezeTender'),
            getCommonSettings: ApiGenerator.getApi('getCommonSettings'),
            postDesignation: ApiGenerator.getApi('postDesignation'),
            postBOQHistory: ApiGenerator.getApi('postBOQHistory'),
            getBOQHistory: ApiGenerator.getApi('getBOQHistory'),
            getMilestone: ApiGenerator.getApi('getMilestone'),
            postMilestone: ApiGenerator.getApi('posttMilestone'),
            postVendorCheckList: ApiGenerator.getApi('postVendorCheckList'),
            getVendorCheckList: ApiGenerator.getApi('getVendorCheckList'),
            postProjectMileStone: ApiGenerator.getApi('postProjectMileStone'),
            getProjectMileStone: ApiGenerator.getApi('getProjectMileStone'),
            getAuthentication: ApiGenerator.getApi('getAuthentication'),
            postAuthentication: ApiGenerator.getApi('postAuthentication'),
            getServiceList: ApiGenerator.getApi('getServiceList'),
            changePassword: ApiGenerator.getApi('ChangePassword'),
            postProjectMileStoneReview: ApiGenerator.getApi('postProjectMileStoneReview'),
            getProjectMileStoneReview: ApiGenerator.getApi('getProjectMileStoneReview'),
            getDashboard: ApiGenerator.getApi('getDashboard'),
            postTenderAssign: ApiGenerator.getApi('postTenderAssign'),
          });

    })


;
