/**
 * 
 */

angular.module('cdc')

//This directive is used to perform some function when rendering of the particular tag completes
// Usage: after-render="myFunctionName(param1,param2,..)"
.directive('afterRender', ['$timeout', function ($timeout) {
    var def = {
        restrict: 'A',
        terminal: false,
        transclude: false,
        link: function (scope, element, attrs) {
        	$timeout(function () {
        		scope.$eval(attrs.afterRender);
      	  	});
        }
    };
    return def;
}]);