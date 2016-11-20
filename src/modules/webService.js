angular.module('WebService', [])
    .factory('API',function($http,$resource,EnvService) {
      return {
        login : {
          "url" : "/api/User",
          "method": "GET",
          "Content-Type":"application/json",
          "isArray" : true
        },
        logout : {
          url : "/api/User",
          method: "GET"
        },
        token : {
          "url" : "/api/User",
          "method": "GET",
          "Content-Type":"application/json",
          "isArray" : true
        }
      }
    })
    .factory('ApiGenerator',function($http,$resource,API,EnvService) {
      return {
        getApi : function(api) {
          var obj = {};
          obj = API[api];
          obj.url = EnvService.getBasePath()+obj.url; // prefix the base path
          console.log(">>>>>>>>>>>>>>   ",obj);
          return obj;
        }
      }
    })

;
