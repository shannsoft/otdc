app.factory('UserService',function($http,$localStorage){

  var user = {};
  var UserService = {};
  UserService.getUser = function() {
    return user;
  };
  UserService.setUser = function(userData) {
    user = userData
  };
  /**
   * This is used to autorise api based on the user Designation
   *
   */
  UserService.authorisedApi = function(api) {
    user = userData
  };
  return UserService;
})
