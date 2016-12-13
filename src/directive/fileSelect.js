app.directive('fileSelect', [function () {
    return {
        restrict:"EA",
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
              console.log("attrs  ",attrs.fileData);
               var fr = new FileReader();
                var file = evt.target.files[0];
                fr.onloadend = function () {
                   var result = this.result;
                  //  var hex = "";
                  //  for (var i = 0; i < this.result.length; i++) {
                  //      var byteStr = result.charCodeAt(i).toString(16);
                  //      if (byteStr.length < 2) {
                  //          byteStr = "0" + byteStr;
                  //      }
                  //      hex += " " + byteStr;
                  //  }
                   window.fileData = {
                     FileName:file.name,
                     InputStream:result.split(";base64,")[1]
                   }
                   scope.fileSelected(window.fileData);
               };
               fr.readAsDataURL(file);

            });
        },
        scope:{
          fileSelected :"&",
          fileData :"=",
        }
    }
}]);
