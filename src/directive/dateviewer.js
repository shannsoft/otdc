/**
 * directive :dateviewer
 * Info : used to create the date picker and set the ng-model value passed to it
 * input : ngModel
 * output :...
 * createdDate - 10-9-16
 * updated on -  10-9-16 // used to create the date picker and store the value in theng-model
 */
app.directive('dateViewer', function () {
    return {
        require: "ngModel",
        restrict: 'EA',
        link: function(scope, element, attrs) {
          scope.minDate = attrs.minDate || null;
          scope.maxDate = attrs.maxDate|| null;
          scope.disable = scope.disable == "true" ? true : false;
          scope.disablingDate();
        },
        templateUrl: 'src/directive/views/datepicker.html',
        controller:'dateViewerController',
        scope:{
          ngModel:'=',
          // minDate:'=', // if true then disable prev date , else disable given date
          // maxDate:'=',// if true then disable next date , else disable given date
          className:"=",
          disable:"="
        }
    };
})
.controller("dateViewerController",["$scope",function($scope) {
  // disabling dates based on condition , self executing function
  console.log("$scope.disable  ",typeof $scope.disable);
  $scope.disable = $scope.disable == "true" ? true : false;
  $scope.disablingDate = function(){
    if($scope.minDate && $scope.minDate!="") {
      $scope.minDate = $scope.minDate == "true" ? true : false;
      if(typeof $scope.minDate == "boolean") {
        $scope.minDate = new Date();
      }
      else if(typeof $scope.minDate == "string") {
        $scope.minDate = new Date($scope.minDate);
      }

    }
    else {
      $scope.minDate = null;
    }

    if($scope.maxDate && $scope.maxDate!="") {
      $scope.maxDate = $scope.maxDate == "true" ? true : false;
      if(typeof $scope.maxDate == "boolean") {
        $scope.maxDate = new Date();
      }
      else if(typeof $scope.maxDate == "string") {
        $scope.maxDate = new Date($scope.maxDate);
      }

    }
    else {
      $scope.maxDate = null;
    }

  }
  $scope.disablingDate();

  $scope.open2 = function() {
   $scope.popup2.opened = true;
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];
  $scope.popup2 = {
    opened: false
  };
  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
  $scope.open = function() {
   $scope.popup.opened = true;
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];
  $scope.popup = {
    opened: false
  };
  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
}])
