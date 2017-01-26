app.constant("Constants", {
        "debug":false,
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
            "basePath" :"http://api.otdctender.in",
          }
        },
        // this will be used to validate client side operation as per the user role
        "apiAuth" : {
          "super_admin" : { // we need to manipulate the role name to match this key
            "user":["get","getById","post","update","delete"],
            "vendor":["get","getById","post","update","delete"]
          },
          "admin" : { // we need to manipulate the role name to match this key
            "user":["get","getById","post","update"],
            "vendor":["get","getById","post","update"]
          },
        }
})
