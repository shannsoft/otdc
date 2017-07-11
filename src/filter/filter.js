app.filter('getShortName', function () {
    return function (value) {
      if(value){
        var temp = angular.copy(value);
        temp = temp.split(" ");
        temp = temp[0].charAt(0)+temp[temp.length-1].charAt(0);
        return temp.toUpperCase();
      }
    };
});
app.filter('filterDate', function () {
    return function (value) {
      if(value){
        if(value.indexOf("T"))
            return value.split("T")[0];
        else if(value.indexOf(" "))
          return value.split(" ")[0];
      }
    };
});
app.filter('validateNA', function () {
    var NACheck = ["",undefined,null];
    return function (value) {
      if(NACheck.indexOf(value) != -1){
        return "NA";
      }
      else{
        return value;
      }
    };
});
app.filter('webServiceName', function () {
    return function (value) {
      var filterValue;
      if(value){
        switch (value) {
          case "get":
            filterValue = "Get Data";
            break;
          case "post":
            filterValue = "Save Data";
            break;
          case "put":
            filterValue = "Update Data";
            break;
          case "delete":
            filterValue = "Delete Data";
            break;
          default:

        }
      }
      return filterValue;
    };
});
