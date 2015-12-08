/**
 * WSCallService is a service to perform web service calls
 * 
 * http
 */

angular.module('cdc')
 
.service('WSCallService', function($http, $q) {
	
	var httpGet = function (ws_uri, jsonData) {
		
		var qFunc = function (resolve, reject) {
			
			$http({
			    
				method : 'GET',
			    url : ws_uri,
			    params : jsonData
			
			}).success(function(data, status, headers, config) {
				
				resolve({data : data,	status : status});
			      
			}).error(function(data, status, headers, config) {

				reject({data : data,	status : status});
				
			});
			
		};

		return $q(qFunc);
	};
	
	//setting each function to a name (name: function in return statement), so that the functions can be accessed as WSCallService.name();
	// for accessing httpGet function: WSCallService.httpGet();
	return {
		httpGet: httpGet
	};
	
});