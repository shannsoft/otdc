app.constant("Constants", {
        "storagePrefix": "goAppOTDC$",
        "getTokenKey" : function() {return this.storagePrefix + "token";},
        "getLoggedIn" : function() {return this.storagePrefix + "loggedin";},
        "availableColor" : "#3955dd",
        "checkedInColor" : "#ff0000",
        "bookedColor" : "#434845",
        "alertTime"   : 3000,
        "getUsername" : function() {return this.storagePrefix + "username";},
        "getPassword" : function() {return this.storagePrefix + "password";},
        "getIsRemember" : function() {return this.storagePrefix + "isRemember";},
        "hashKey" : "goAppOTDC",
        "envData" : {
          "env":"dev",
          "dev" : {
            "basePath" :"http://otdctender.in"
          }
        }
})