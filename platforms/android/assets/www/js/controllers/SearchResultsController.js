/**
 * 
 */

angular.module('cdc')

.controller('searchResultsController', function($http, $scope, $state, $stateParams, $ionicPopup, WS_URI, LOCAL_STORAGE_KEYS, WSCallService) {
	
	$scope.showLoading();
	
	//console.log($stateParams.url);
	//console.log($stateParams.jsonData);
	
	$scope.loadDefaultMenuPopoverTemplate();
	
	if($stateParams.url!=undefined) {
			
		WSCallService.httpGet($stateParams.url, $stateParams.jsonData).then(function(result) {
			//console.log(result.data);
			$scope.shouldShowDelete = false;
			$scope.shouldShowReorder = false;
			$scope.listCanSwipe = true;
			//$scope.showProjectDetails = true;
			$scope.projects = result.data.aaData;
			$scope.hideLoading();
		}, function(error) {
			console.log(error);
			$scope.hideLoading();	
		});
	 
	} else {
		$scope.hideLoading();
	}
	
	// to show project detail
	$scope.getProjectDetailByID = function(id) {
		 //console.log(id);
		 $state.go('menu.project-detail', {id : id});
		 $scope.closeProjectMenu();
	 };
	 
	 //function called when a project is long pressed
	 $scope.openProjectMenu = function(id, title) {
		 //console.log(id);
		 $scope.id = id;
		 
		 $scope.projectMenuPopup = $ionicPopup.show({
		 	scope: $scope,
	        title: title,
	        templateUrl: 'templates/project_menu.html',
	        buttons: [
	                  /*{ text: 'Close' },*/
	                  {
	                    text: '<b>Close</b>',
	                    type: 'button-positive',
	                    onTap: function(e) {
	                    	$scope.closeProjectMenu;
	                    }
	                  }
	                ]
	    });
		 
	 };
	 
	 // function to close project menu which appears when long pressed
	 $scope.closeProjectMenu = function() {
		 if($scope.projectMenuPopup!=undefined)
		 $scope.projectMenuPopup.close();
	 }
	 
});