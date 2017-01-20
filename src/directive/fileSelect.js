app.directive('fileSelect', ['$parse', function ($parse) {
	return {
	   restrict: 'EA',
	   link: function(scope, element, attrs) {
		  var model = $parse(attrs.fileSelect);
		  var modelSetter = model.assign;
		  element.bind('change', function(){
			 var fr = new FileReader();
			 var file  = element[0].files[0];
			 fr.onloadend = function () {
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
}]);
