/**
 * 
 */

angular.module('cdc')

.controller('loginController', function($scope, $state, $ionicPopup, AuthService, WSCallService, ErrorMsgService, WS_URI, ID) {
	
	$scope.submitted = false;
	
  $scope.data = {};
 
  $scope.login = function(data, form) {
	  //console.log(form.$valid);
	  $scope.submitted = true;
	  
	  //dont submit form if validation fails
	  if(!form.$valid) {
		  return false;
	  }
	
	  /*
	  
	  WSCallService.httpGet(WS_URI.LOGOUT, jsonData).then(function(result) {
			
		}, function(error) {
			
		});
	  */
	  
	  //shows loading text
	 $scope.showLoading();
	
    AuthService.login(data.username, data.password).then(function(authenticated) {
      
      $scope.setCurrentUsername(data.username);
      $state.go('menu.home');
      
      //hide loading
      $scope.hideLoading();
      
    }, function(err) {
    	$scope.hideLoading();
    	
    	ErrorMsgService.titleAndError('Login Failed', err);
	    
    });
    
  };
  
});