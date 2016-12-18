app.directive('history', function () {
    return {
        restrict: 'EA',

        link: function(scope, element, attrs) {
            $(element[0]).on('click', function() {
                history.back();
                scope.$apply();
            });

        }
    };
});
