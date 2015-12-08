/**
 * 
 */
angular.module('cdc')

.controller('quickSearchController', function($scope, $state, $http, WS_URI, LOCAL_STORAGE_KEYS, $ionicPopup, WSCallService) {
  
	$scope.showLoading();
	
	$scope.loadDefaultMenuPopoverTemplate();
	
	$scope.formdata = {};
	
	var jsonData = {
	  'sessionId' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID),
	  'securityKey' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SECURITY_KEY)
	};
	  
	WSCallService.httpGet(WS_URI.QUICK_SEARCH, jsonData).then(function(result) {
		//console.log(result.data.Data);
		
		//setting fields to show in the form
		$scope.stateIdList = result.data.Data[0].stateIdList;
		$scope.newProject = result.data.Data[0].newProjectList.split(',');
        $scope.sectionList = result.data.Data[0].sectionList;
        $scope.subSectionList = result.data.Data[0].subSectionList;
        $scope.constructionTypeList = result.data.Data[0].constructionTypeList.split(',');
        $scope.divisionList = result.data.Data[0].divisionsList;
        $scope.showAllList = result.data.Data[0].showAllList.split(',');
        $scope.displayModeList = result.data.Data[0].displayModeList.split(',');
        
        //variables to hide or show fields
        $scope.hideSection = true;
        $scope.hideStage = true;
        $scope.hideConsType = true;
        $scope.hideDivision = true;
        
        // function to show or hide sections
        $scope.hideSections = function(hideSection) {
        	if(hideSection == true) {
        		// show sections and hide others
        		$scope.hideSection = false;
        		$scope.hideStage = true;
        		$scope.hideConsType = true;
        		$scope.hideDivision = true;
        	} else {
        		$scope.hideSection = true;
        	}
        };
        
        // function to show or hide stages
        $scope.hideStages = function(hideStage) {
        	if(hideStage == true) {
        		// show stages and hide others
        		$scope.hideStage = false;
        		$scope.hideSection = true;
        		$scope.hideConsType = true;
        		$scope.hideDivision = true;
        	} else {
        		$scope.hideStage = true;
        	}
        };
        
        // function to show or hide construction types
        $scope.hideConsTypes = function(hideConsType) {
        	if(hideConsType == true) {
        		// show construction types and hide others
        		$scope.hideConsType = false;
        		$scope.hideSection = true;
        		$scope.hideStage = true;
        		$scope.hideDivision = true;
        	} else {
        		$scope.hideConsType = true;
        	}
        };
        
        // function to show or hide divisions
        $scope.hideDivisions = function(hideDivision) {
        	
        	if(hideDivision == true) {
        		// show division and hide others
        		$scope.hideDivision = false;
        		$scope.hideConsType = true;
        		$scope.hideSection = true;
        		$scope.hideStage = true;
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
        
	}, function(error) {
		console.log('error '+error);
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
  	  
  	  		if(data!=undefined) {
  	  
		  	  	var url = WS_URI.QUICK_SEARCH_RESULTS;
		  	  
			  	var stateId='';
				var sectionIdList='';
				var consTypeList='';
				var subSecList='';
				var divisionList='';
				var newUpdatedFlag=0;
				var showAll=0;
				var displayMode='';
			
				
				if(data['stateId']!=undefined)
					stateId = data['stateId'];
				
				if(data['sectionList']!=undefined){
					sectionIdList = getSelectedCBValues(data['sectionList']);
				}
				
				if(data['consTypeList']!=undefined)
					consTypeList = getSelectedCBValues(data['consTypeList']);
				
				if(data['subSecList']!=undefined)
					subSecList = getSelectedCBValues(data['subSecList']);
				
				if(data['divisionList']!=undefined) {
					// to get list of values from divisionList
					divisionList = Object.keys(data['divisionList']).map(function(k) { return data['divisionList'][k] }).toString();
				}
				
				if(data['newProject']!=undefined)
					newUpdatedFlag = data['newProject'];
				
				if(data['showAll']!=undefined) {
					if(data['showAll']==true)
						showAll = 1;
				}
				
				/*if(data['displayMode']!=undefined)
					displayMode = data['displayMode'];*/
				
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
		  	  
		  	  $state.go('menu.searchresults', {url: url, jsonData : jsonData});
  	  	}
    };
  
});