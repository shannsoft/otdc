angular.module('WebService', [])
    .factory('API',function($http,$resource,EnvService) {
      return {
        login : {
          url : "/api/user",
          method: "GET"
        },
        logOut : {
          url : "/api/User",
          method: "GET"
        }
      }
    })
    .factory('ApiGenerator',function($http,$resource,API,EnvService) {
      return {
        getApi : function(api) {
          console.log("request api ",api);
          var obj = {
            url : EnvService.getBasePath()+API[api]['url'],
            method: API[api]['method']
          }
          return obj;
        }
      }
    })

;
