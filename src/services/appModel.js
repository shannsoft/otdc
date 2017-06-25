app.factory('AppModel',function($rootScope,$http,$localStorage,$resource,$location,ApiGenerator,Events,Constants){
  var appModel = {};
  appModel.history = [];
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
  // here pushing only the path
  appModel.pushHistory = function(path) {
    appModel.history.push(path);
  }
  appModel.popHistory = function() {
    return this.history[this.history.length-1];
  }

  return appModel;
})
