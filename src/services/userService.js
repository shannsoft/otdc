app.factory('UserService',function($http,$localStorage,$resource,ApiGenerator){

  var user = {};
  var UserService = {};
  UserService.getUser = function() {
    return user;
  };
  UserService.setUser = function(userData) {
    user = userData
  };
  // this is used to call the web serviceCall
  UserService.serviceCall = function() {
    return $resource('/',null, {
      getUser: ApiGenerator.getApi('getUser'), // get user can be called in many form
    });
  };
  return UserService;
})
