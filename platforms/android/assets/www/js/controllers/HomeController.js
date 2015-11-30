/**
 * 
 */

angular.module('cdc')

.controller('homeController', function($http, $scope, $state, $stateParams, WS_URI, LOCAL_STORAGE_KEYS, WSCallService) {
	
	$scope.showLoading();
	
	var jsonData = {
	  'sessionId' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID),
	  'securityKey' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SECURITY_KEY)
  	};
	
	var stateIdList = '';
	var sectionIdList = '';
 
	WSCallService.httpGet(WS_URI.QUICK_SEARCH, jsonData).then(function(details) {
		
		//console.log(details);
		var result = details.data.Data[0];
		
		//setting variables
		var stateList = result.stateIdList;
		var sectionList = result.sectionList;
      
      // setting subSectionList to show Quick Links in Home page
      $scope.subSectionList = result.subSectionList;
      $scope.showAll = 0;
      // get state Id List
      for(var i=0; i < stateList.length; i++) {
    	  var stateId = stateList[i][0];
    	  if(stateIdList=='') {
    		  stateIdList = stateId;
    	  } else {
    		  stateIdList = stateIdList +','+ stateId;
    	  }
      }
      
      //get section Id List
      for(var i=0; i < sectionList.length; i++) {
    	  var sectionId = sectionList[i][0];
    	  if(sectionIdList=='') {
    		  sectionIdList = sectionId;
    	  } else {
    		  sectionIdList = sectionIdList +','+ sectionId;
    	  }
      }
      
      $scope.hideLoading();
      
	}, function(error) {
		console.log(error.status);
		$scope.hideLoading();
	});
	
	/*$http({
	    method : 'GET',
	    url : WS_URI.QUICK_SEARCH,
	    params : jsonData

	}).success(function(data, status, headers, config) {
		//console.log(data.Data);
		var result = data.Data[0];
		
		//setting variables
		var stateList = result.stateIdList;
		var sectionList = result.sectionList;
      
      // setting subSectionList to show Quick Links in Home page
      $scope.subSectionList = result.subSectionList;
      $scope.showAll = 0;
      // get state Id List
      for(var i=0; i < stateList.length; i++) {
    	  var stateId = stateList[i][0];
    	  if(stateIdList=='') {
    		  stateIdList = stateId;
    	  } else {
    		  stateIdList = stateIdList +','+ stateId;
    	  }
      }
      
      //get section Id List
      for(var i=0; i < sectionList.length; i++) {
    	  var sectionId = sectionList[i][0];
    	  if(sectionIdList=='') {
    		  sectionIdList = sectionId;
    	  } else {
    		  sectionIdList = sectionIdList +','+ sectionId;
    	  }
      }
      
      $scope.hideLoading();
      
	}).error(function(data, status, headers, config) {
		console.log('error '+data+' '+status);
		$scope.hideLoading();
	}).finally(function() {
		$scope.hideLoading();
	});*/
	
	$scope.setShowAll = function() {
		if($scope.showAll==0){
			$scope.showAll = 1;
		} else {
			$scope.showAll = 0;
		}
	}
  
  	// function to shown quick links search results
	$scope.quickLinkResults = function(subSec) {
		
		//console.log(subSec);
		
		var data = {
			'stateIds' : stateIdList,
			'sectionIds' : sectionIdList,
			'subSection' : subSec,
			'showAll' : $scope.showAll
		};
		
		$state.go('menu.quicklinksresults', {selectedData : data});
	}
	
});

