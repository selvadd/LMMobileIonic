/**
 * 
 */

angular.module('cdc')

.controller('quickLinksResultsController', function($http, $scope, $state, $stateParams, $ionicPopup, WS_URI, LOCAL_STORAGE_KEYS, WSCallService) {
	
	$scope.showLoading();
	
	var stateIds='';
	var sectionIds='';
	var subSection='';
	var showAll=0;
	
	console.log($stateParams.selectedData);
	
	if($stateParams.selectedData!=undefined) {
		
		if($stateParams.selectedData['stateIds']!=undefined)
			stateIds = $stateParams.selectedData['stateIds'];
		
		if($stateParams.selectedData['sectionIds']!=undefined)
			sectionIds = $stateParams.selectedData['sectionIds'];
		
		if($stateParams.selectedData['subSection']!=undefined)
			subSection = $stateParams.selectedData['subSection'];
		
		if($stateParams.selectedData['showAll']!=undefined)
			showAll = $stateParams.selectedData['showAll'];
		
	 var jsonData = {
   		'sessionId' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID),
   		'securityKey' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SECURITY_KEY),
   		'stateIds' : stateIds,
   		'sectionIdList' : sectionIds,
   		'newUpdatedFlag' : 0,
   		'subSectionList' : subSection,
   		'constructionTypes' : '',
   		'divisionIdList' : '',
   		'showAll' : showAll,
   		'displayMode' : ''
   	};
	
	WSCallService.httpGet(WS_URI.QUICK_SEARCH_RESULTS, jsonData).then(function(result) {
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
	 
	 /*$http({
		    method : 'GET',
		    url : WS_URI.QUICK_SEARCH_RESULTS,
		    params : jsonData
		}).success(function(data, status, headers, config) {
			//console.log(data);
			$scope.shouldShowDelete = false;
			$scope.shouldShowReorder = false;
			$scope.listCanSwipe = true;
			//$scope.showProjectDetails = true;
			$scope.projects = data.aaData;
			$scope.hideLoading();
		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data+' '+status);
			$scope.hideLoading();
		}).finally(function(data){
			$scope.hideLoading();
		});*/
		
	} else {
		$scope.hideLoading();
	}
	
	// to show project detail
	$scope.getProjectDetailByID = function(id) {
		 console.log(id);
		 $state.go('menu.project-detail', {id : id});
	 };
	 
	 $scope.longPress = function(id) {
		 
		 $scope.projectMenu = $ionicPopup.show({
		 	scope: $scope,
	        title: 'Long Press',
	        templateUrl: 'templates/project_menu.html'
	    });
		 
	 };
	 
	 $scope.closeProjectMenu = function() {
		 $scope.projectMenu.close();
	 }
		  
});