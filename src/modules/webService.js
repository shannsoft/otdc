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
            getUsers: {
                "url": "/api/User",
                "method": "GET",
                "Content-Type": "application/json",
                // "isArray" : true
            }

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

;
