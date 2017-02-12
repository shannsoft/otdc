app.factory('UserService',function($rootScope,$http,$localStorage,$resource,ApiGenerator,Events,Constants,$q){

  var user = {};
  var UserService = {};
  var roles = {
    "10000":"superAdmin",
  }
  // side bar details mapped data with the degignation id
  var sideBar = {
    '10000' :[
      {
        "label" : "Dashboard",
        "state" : "dashboard",
        "fClass" : "fa fa-home",
      },
      {
        "label" : "Tender Management",
        "state" : "tenderList",
        "fClass" : "fa fa-home",
      },
      {
        "label" : "User Management",
        "state" : "UserList",
        "fClass" : "fa fa-th-large",
      },
      {
        "label" : "Vendor Management",
        "state" : "VendorList",
        "fClass" : "fa fa-home",
      },
      {
        "label" : "Tender Milestone",
        "state" : "tenderMilestone",
        "fClass" : "fa fa-th-large",
      },
      {
        "label" : "Role Management",
        "state" : "role_management",
        "fClass" : "fa fa-th-large",
      },
      {
        "label" : "Permission Management",
        "state" : "permissionManagement",
        "fClass" : "fa fa-th-large",
      },
      {
        "label" : "Project Milestone",
        "state" : "projectMilestone",
        "fClass" : "fa fa-th-large",
      },
    ]
  }
  UserService.getRole = function(roleId) {
    var user = this.getUser();
    var role = roles[this.getUser().designationId];
    if(!role)
    {
      // emit event to terminate redirect to login
      $rootScope.$emit(Events.eventType.error,{message:Events.roleError})
    }
    else {
      return role;
    }
  };

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
  // UserService.serviceCall = function() {
  //   return $resource('/',null, {
  //     getUser: ApiGenerator.getApi('getUser'), // get user can be called in many form
  //     getUsers: ApiGenerator.getApi('getUsers'), // get user can be called in many form
  //     addUser: ApiGenerator.getApi('addUser'), // get user can be called in many form
  //   });
  // };
  // used to get the side bar details according to user
  UserService.getSideBarInfo = function() {
    var sideBarInfo = sideBar[this.getUser().designationId];
    if(!sideBarInfo)
    {
      // emit event to terminate redirect to login
      $rootScope.$emit(Events.eventType.error,{message:Events.errorSideBarData})
    }
    else {
      return sideBarInfo;
    }

  };
  /**
   * This is used to autorise api based on the user Designation
   @param -
    api - api name
    type - type of the method need to access
    callback - callback function
   *
   */
  var authorisedApi = function(api,type,callback) {
    var deferred = $q.defer();
    var authetication = user.authentication;
    var keys = Object.keys(authetication);
    var len = keys.length;
    var counter = 0;
    angular.forEach(authetication,function(value,key) {
      if(value['name'] == api) {
        deferred.resolve(value[type.toLocaleLowerCase()] || false);
      }
      if(counter >=  len-1) {
        deferred.resolve(false);
      }
      counter++;
    })
    return deferred.promise;
  };
  /**
   * functionName :checkPermission
   * Info : used to get the info for the authenticaiton of particular web services
   * @param
   api - api name
   type- type of web service
   */
  UserService.checkPermission = function(api,type) {
    var auth = authorisedApi(api,type);
    var auth = auth.$$state.value;
    // console.log("********** ",typeof auth);
    return auth;
  }


  return UserService;
})
