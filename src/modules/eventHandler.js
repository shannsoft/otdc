angular.module('EventHandler', [])
    .factory('Events', function($rootScope) {
      var eventType = {
        "success":"success",
        "error":"error",
        "warning":"warning",

      }
      return{
        "eventType"              : eventType,
        "validationFieldMissing" :"validation Field Missing",
        "validationHintMissing" :"validation Hint Missing",
        "successInLogin"          : "success In Login",
        "successInLogout"          : "success In Logout",
        "errorInLogin"          : "error In Login",
        "errorInLogout"          : "errorInLogout",
        "roleError"          : "role in Error",
        "errorSideBarData"          : "error Side Bar Data",
        "userLogged"          : "User Logged",
        "selectTender"          : "Please select tender",
        "noVendorSelected"          : "Please select Vendor",
        "invalidOperation"          : "Invalid Operation",
        "updateSideBar"             :"Update Sidebar",
        "pleaseSelectMilestone"             :"Please select Milestone",
        "pleaseSelectTender"             :"Please select Tender",
      }
    })
;
