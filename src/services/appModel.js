app.factory('AppModel',function($rootScope,$http,$localStorage,$resource,ApiGenerator,Events,Constants){
  var appModel = {};
  appModel.getSetting = function(key) {
    if(key)
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
