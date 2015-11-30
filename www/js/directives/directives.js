/**
 * 
 */

angular.module('cdc')

//This directive is used to perform some function when rendering of the particular tag completes
// Usage: after-render="myFunctionName(param1,param2,..)"
.directive('afterRender', ['$timeout', function ($timeout) {
    var def = {
        restrict: 'A',  //"A" is for attribute, "E" is for element, "C" for class, "M" for comment
        terminal: false, //terminal property tells Angular to skip all directives on that element that comes after it
        transclude: false, // if true, Includes the template (if given) into the DOM. Here template is not given.
        link: function (scope, element, attrs) {
        	$timeout(function () {
        		scope.$eval(attrs.afterRender);
      	  	});
        }
    };
    return def;
}]);