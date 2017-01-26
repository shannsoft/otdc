app.factory('EnvService',function($http,CONFIG,$localStorage){
  var envData = env = {};
  var settings =  {};

  return{
    setSettings : function(setting) {
      settings = setting;
      // setting env
      this.setEnvData(setting.envData);
    },
    getSettings : function(param) {
      if(param){
        return settings[param];
      }
      return null; // default
    },
    validateApiAuth : function(role,api,operation) {
      var apiAuth = this.getSettings("apiAuth")[role];

    },
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
