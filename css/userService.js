app.factory('UserService',function($http,$localStorage){

  var user = {};
  var UserService = {};
  UserService.getUser = function() {
    return user;
  };
  UserService.setUser = function(userData) {
    user = userData
  };
  return UserService;
})
