/**
 * 
 */

angular.module('cdc')

.controller('loginController', function($scope, $state, $ionicPopup, AuthService, WSCallService, WS_URI, ID) {
	$scope.submitted = false;
	
  $scope.data = {};
 
  $scope.login = function(data, form) {
	  //console.log(form.$valid);
	  $scope.submitted = true;
	  
	  //dont submit form if validation fails
	  if(!form.$valid) {
		  return false;
	  }
	
	  //testing
	  
	  /*
	  
	  WSCallService.httpGet(WS_URI.LOGOUT, jsonData).then(function(result) {
			
		}, function(error) {
			
		});
	  */
	  
	  
	  //till testing
	  
	  //shows loading text
	 $scope.showLoading();
	
    AuthService.login(data.username, data.password).then(function(authenticated) {
      
      $scope.setCurrentUsername(data.username);
      $state.go('menu.home');
      
      //hide loading
      $scope.hideLoading();
      
    }, function(err) {
    	$scope.hideLoading();
	    var alertPopup = $ionicPopup.alert({
	        title: 'Login failed!',
	        template: err
	    });
    });
    
  };
  
});