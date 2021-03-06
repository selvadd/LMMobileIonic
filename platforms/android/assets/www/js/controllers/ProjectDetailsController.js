/**
 * 
 */
angular.module('cdc')

.controller('projectDetailsController', function($scope, $state, $http, $ionicPopover, WS_URI, LOCAL_STORAGE_KEYS, $stateParams, WSCallService) {
	
	$scope.showLoading();
	
	if($stateParams.id!=undefined) {
	
		var jsonData = {
	   		'sessionId' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID),
	   		'securityKey' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SECURITY_KEY),
	   		'ids' : $stateParams.id
	   	};
			
		WSCallService.httpGet(WS_URI.PROJECT_DETAILS, jsonData).then(function(result) {
			//console.log(result.data.Data[0]);
			$scope.projectDetail = result.data.Data[0];
			// to change right menu template
			$scope.changeMenuPopoverTemplate('templates/project_menu_popover.html',$scope);
			$scope.hideLoading();
		}, function(error) {
			console.log(error);
			$scope.hideLoading();
		});
	
	} else {
		$scope.hideLoading();
	}
	
});