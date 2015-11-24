/**
 * 
 */
angular.module('cdc')

.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
  .state('quicksearch', {
    url: '/online-product/quicksearch',
    templateUrl: 'online_product/quicksearch/quicksearch.html',
    controller: 'quickSearchController'
  })
  .state('quicksearchresults', {
    url: '/online-product/quicksearch/search-results',
    params: {'selectedData': null},
    templateUrl: 'online_product/quicksearch/quicksearchresults.html',
    controller: 'quickSearchResultsController'
  });
  
})

.controller('quickSearchController', function($scope, $state, $http, URLS, LOCAL_STORAGE_KEYS, $ionicPopup) {
  
	$scope.showLoading();
	
	$scope.formdata = {};
	
	  var jsonData = {
    		  'sessionId' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID),
    		  'securityKey' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SECURITY_KEY)
    	};
	  
    $http({
	    method : 'GET',
	    url : URLS.WS_URL+'/online-product/quick-search',
	    params : jsonData
	}).success(function(data, status, headers, config) {
		//console.log(data.Data);
		
		//setting fields to show in the form
		$scope.stateIdList = data.Data[0].stateIdList;
		$scope.newProject = data.Data[0].newProjectList.split(',');
        $scope.sectionList = data.Data[0].sectionList;
        $scope.subSectionList = data.Data[0].subSectionList;
        $scope.constructionTypeList = data.Data[0].constructionTypeList.split(',');
        $scope.divisionList = data.Data[0].divisionsList;
        $scope.showAllList = data.Data[0].showAllList.split(',');
        $scope.displayModeList = data.Data[0].displayModeList.split(',');
        
        //variables to hide or show fields
        $scope.hideSection = true;
        $scope.hideStage = true;
        $scope.hideConsType = true;
        $scope.hideDivision = true;
        
        $scope.hideSections = function(hideSection) {
        	if(hideSection == true) {
        		$scope.hideSection = false;
        	} else {
        		$scope.hideSection = true;
        	}
        };
        
        $scope.hideStages = function(hideStage) {
        	if(hideStage == true) {
        		$scope.hideStage = false;
        	} else {
        		$scope.hideStage = true;
        	}
        };
        
        $scope.hideConsTypes = function(hideConsType) {
        	if(hideConsType == true) {
        		$scope.hideConsType = false;
        	} else {
        		$scope.hideConsType = true;
        	}
        };
        
        $scope.hideDivisions = function(hideDivision) {
        	if(hideDivision == true) {
        		$scope.hideDivision = false;
        	} else {
        		$scope.hideDivision = true;
        	}
        };
        
        //default values
        if($scope.formdata.newProject==undefined){
        	$scope.formdata.newProject = 0;
        }
        
        if($scope.formdata.stateId==undefined){
        	$scope.formdata.stateId = $scope.stateIdList[0][0];
        }
        
        $scope.hideLoading();
        
	}).error(function(data, status, headers, config) {
		console.log('error '+data+' '+status);
		$scope.hideLoading();
	}).finally(function() {
		$scope.hideLoading();
	});
    
    //function to get values of the selected checkboxes
      var getSelectedCBValues = function (data) {
    	  var selectedValues = '';
 		 if(data!=undefined){
 			var keyArray = Object.keys(data);
 			//console.log(keyArray);
 			for(var i=0;i<keyArray.length;i++){
 				var selected = data[keyArray[i]];
 				if(selected==true){
 					if(selectedValues!='') {
 						selectedValues = selectedValues+','+keyArray[i];
 					} else {
 						selectedValues = keyArray[i];
 					}
 				}
 			}
 			//console.log(selectedValues);
 		}
 		return selectedValues;
 	 };
      
    // quick search action method
    $scope.getQuickSearchResults = function(data, form) {
    	
  	  $scope.submitted = true;

  	  //dont submit form if validation fails
  	  /*if(!form.$valid) {
  		  return false;
  	  }*/
  	  
  	  if(data['sectionList']==undefined && data['subSecList']==undefined && data['divisionList']==undefined) {
  		var alertPopup = $ionicPopup.alert({
  	        title: 'Validation Error!',
  	        template: 'Please select a valid Sections or Stages or Divisions'
  	      });
  		
  		return false;
  	  }else if(getSelectedCBValues(data['sectionList'])=='' && getSelectedCBValues(data['subSecList'])=='' && getSelectedCBValues(data['divisionList'])=='') {
  		var alertPopup = $ionicPopup.alert({
  	        title: 'Validation Error!',
  	        template: 'Please select a valid Sections or Stages or Divisions'
  	      });
  		
  		return false;
  	  }
  	  
    	$state.go('quicksearchresults', {selectedData : data});
    };
	    
  
})

.controller('quickSearchResultsController', function($scope, $state, $http, URLS, LOCAL_STORAGE_KEYS, $stateParams) {
	
	$scope.showLoading();
	//console.log('quicksearchresults');
	
	//get checkbox values that are selected 
	 var getSelectedCBValues = function (data) {
		 var selectedValues = '';
		 if(data!=undefined){
			var keyArray = Object.keys(data);
			//console.log(keyArray);
			for(var i=0;i<keyArray.length;i++){
				var selected = data[keyArray[i]];
				if(selected==true){
					if(selectedValues!='') {
						selectedValues = selectedValues+','+keyArray[i];
					} else {
						selectedValues = keyArray[i];
					}
				}
			}
			//console.log(selectedValues);
		}
		return selectedValues;
	 };
	 
	 // function ot show or hide project details when click on title 
	 $scope.showOrHideProjectDetail = function (id) {

		 if(document.getElementById(id).style.display=='none'){
			 document.getElementById(id).style.visibility='visible';
			 document.getElementById(id).style.display='block';
		 }else{
			 document.getElementById(id).style.visibility='hidden';
			 document.getElementById(id).style.display='none';
		 }
		 
	 };
	 
	 // function to hide project details initially
	 // this function is called using after-render directive
	 $scope.hideDivInitially = function(id) {
		 //console.log(id);
		 var div = document.getElementById(id);
		 if(div!=undefined) {
		 	div.style.visibility='hidden';
		 	div.style.display='none';
	 	}
	 };
	 
	 $scope.getProjectDetailByID = function(id) {
		 //console.log(id);
		 $state.go('project-detail', {id : id});
	 };
	 
	var stateId='';
	var sectionIdList='';
	var consTypeList='';
	var subSecList='';
	var divisionList='';
	var newUpdatedFlag=0;
	var showAll=0;
	var displayMode='';
	
	if($stateParams.selectedData!=undefined) {
		
		//console.log($stateParams.selectedData);
		
		if($stateParams.selectedData['stateId']!=undefined)
			stateId = $stateParams.selectedData['stateId'];
		
		if($stateParams.selectedData['sectionList']!=undefined){
			sectionIdList = getSelectedCBValues($stateParams.selectedData['sectionList']);
		}
		
		if($stateParams.selectedData['consTypeList']!=undefined)
			consTypeList = getSelectedCBValues($stateParams.selectedData['consTypeList']);
		
		if($stateParams.selectedData['subSecList']!=undefined)
			subSecList = getSelectedCBValues($stateParams.selectedData['subSecList']);
		
		if($stateParams.selectedData['divisionList']!=undefined) {
			// to get list of values from divisionList
			divisionList = Object.keys($stateParams.selectedData['divisionList']).map(function(k) { return $stateParams.selectedData['divisionList'][k] }).toString();
		}
		
		if($stateParams.selectedData['newProject']!=undefined)
			newUpdatedFlag = $stateParams.selectedData['newProject'];
		
		if($stateParams.selectedData['showAll']!=undefined) {
			if($stateParams.selectedData['showAll']==true)
				showAll = 1;
		}
		
		/*if($stateParams.selectedData['displayMode']!=undefined)
			displayMode = $stateParams.selectedData['displayMode'];*/
		
	}
	
	 var jsonData = {
   		'sessionId' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID),
   		'securityKey' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SECURITY_KEY),
   		'stateIds' : stateId,
   		'sectionIdList' : sectionIdList,
   		'newUpdatedFlag' : newUpdatedFlag,
   		'subSectionList' : subSecList,
   		'constructionTypes' : consTypeList,
   		'divisionIdList' : divisionList,
   		'showAll' : showAll,
   		'displayMode' : displayMode
   	};
	
	 $http({
		    method : 'GET',
		    url : URLS.WS_URL+'/online-product/quick-search/search-results',
		    params : jsonData
		}).success(function(data, status, headers, config) {
			//console.log(data);
			$scope.shouldShowDelete = false;
			$scope.shouldShowReorder = false;
			$scope.listCanSwipe = true;
			$scope.showProjectDetails = true;
			$scope.projects = data.aaData;
			$scope.hideLoading();
		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data+' '+status);
			$scope.hideLoading();
		}).finally(function(data){
			$scope.hideLoading();
		});
	 
	
});