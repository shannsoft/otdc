app.factory('EnvService',function($http,CONFIG,$localStorage){
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
