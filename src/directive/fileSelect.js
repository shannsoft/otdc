
app.directive('fileSelect', ['$parse','$rootScope', function ($parse,$rootScope) {
	return {
	   restrict: 'EA',
	   link: function(scope, element, attrs) {
		  var model = $parse(attrs.fileSelect);
		  var modelSetter = model.assign;
		  element.bind('change', function(){
			 $rootScope.showPreloader = true;
			 var fr = new FileReader();
			 var file  = element[0].files[0];
			 fr.onloadend = function () {
				 $rootScope.showPreloader = false;
        var result = this.result;
				var obj = {
					fileName : file.name,
					InputStream : result.split(";base64,")[1]
				}
				scope.$apply(function(){
					modelSetter(scope, obj);
				});
			 };
			 fr.readAsDataURL(file);
		  });
	   }
	};
//
// app.directive('fileSelect', [function () {
//     return {
//         restrict:"EA",
//         require: 'ngModel',
//         link: function (scope, element, attrs,ngModelCtrl) {
//             element.on('change', function  (evt) {
//               console.log("attrs  ",attrs.fileData,ngModelCtrl.$modelValue);
//                var fr = new FileReader();
//                 var file = evt.target.files[0];
//                 fr.onloadend = function () {
//                    var result = this.result;
//                   //  var hex = "";
//                   //  for (var i = 0; i < this.result.length; i++) {
//                   //      var byteStr = result.charCodeAt(i).toString(16);
//                   //      if (byteStr.length < 2) {
//                   //          byteStr = "0" + byteStr;
//                   //      }
//                   //      hex += " " + byteStr;
//                   //  }
//                    window.fileData = {
//                      FileName:file.name,
//                      InputStream:result.split(";base64,")[1]
//                    }
//                    scope.fileData = window.fileData;
//                    scope.fileSelected(scope.fileData);
//                };
//                fr.readAsDataURL(file);
//
//             });
//         },
//         scope:{
//           fileSelected :"&",
//           fileData :"=",
//         },
//         controller:function($scope) {
//           console.log('fileData   ',$scope.fileData);
//         }
//     }
//
}]


);
