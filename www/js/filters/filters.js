/**
 * 
 */
angular.module('cdc')

//filter to convert input value to date object
.filter("asDate", function () {
    return function (input) {
    	if(input!=undefined && input.length > 0){
    		return new Date(input);
    	}
        return '';
    }
});