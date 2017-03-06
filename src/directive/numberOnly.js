app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                  var transformedInput;
                    if(attr.allowFloat == "true"){
                      transformedInput = text.replace(/[^0-9,.]/g, '');
                    }
                    else{
                      transformedInput = text.replace(/[^0-9]/g, '');
                    }

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
