/**
 * 
 */

angular.module('cdc')

.controller('savedSearchController', function($scope,LOCAL_STORAGE_KEYS,WSCallService,WS_URI) {

	// Need to call the below method in order to show default right side menu.
	$scope.loadDefaultMenuPopoverTemplate();
	
	$scope.changeBgOnTouch = function(id) {
		console.log(id);
		
		document.getElementById(id).style.backgroundColor = '#ccc';
	}
	
	$scope.changeBgOnRelease = function(id) {
		console.log(id);
		
		document.getElementById(id).style.backgroundColor = '#fff';
	}
	
	var jsonData = {
	  'sessionId' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID),
	  'securityKey' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SECURITY_KEY)
	};
	  
	WSCallService.httpGet(WS_URI.SAVED_SEARCH_LIST, jsonData).then(function(result) {
		
		if(result.data.aaData!=undefined) {
			var savedSearchNamesString = result.data.aaData;
			var savedSearchNamesArray = savedSearchNamesString.split('<>');
	
			//console.log(savedSearchNamesArray);
			$scope.savedSearchList = savedSearchNamesArray;
		}
		
		$scope.hideLoading();
        
	}, function(error) {
		console.log('error '+error);
		$scope.hideLoading();
	});
	
});