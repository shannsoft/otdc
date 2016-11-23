app.factory('UserService',function($rootScope,$http,$localStorage,$resource,ApiGenerator,Constants){

  var user = {};
  var UserService = {};
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
    });
  };
  return UserService;
})
