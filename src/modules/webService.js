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
                url: "/api/User",
                method: "GET"
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
                // "isArray" : true
            },


        }
    })
    .factory('ApiGenerator', function($http, $resource, API, EnvService) {
        return {
            getApi: function(api) {
                var obj = {};
                obj = angular.copy(API[api]);
                obj.url = EnvService.getBasePath() + obj.url; // prefix the base path
                console.log(">>>>>>>>>>>>>>   ", obj);
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
          });

    })

;
