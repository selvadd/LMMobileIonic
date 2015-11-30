/**
 * 
 */

angular.module('cdc')

.controller('menuController', function($scope, $state, $http, $ionicPopover, $ionicHistory, AuthService) {
  
	$scope.popover = '';
	
	// Loads right menu side template
	$ionicPopover.fromTemplateUrl('templates/menuPopOver.html', {
	    scope: $scope
	  }).then(function(popover) {
	    $scope.popover = popover;
	  });
	
	// function to show right side menu
	 $scope.openPopover = function($event) {
	    $scope.popover.show($event);
	  };
	  
	  // function to hide right side menu
	  $scope.closePopover = function() {
	    $scope.popover.hide();
	  };
	  
	  //function of home button
	  $scope.home = function() {
		  // to reload home when moving to home from other states (except home).
		  $ionicHistory.clearCache().then(function(){ 
			  $state.go('menu.home', {}, {reload: true});
		  });		 
	  };
	
	  //function of logout button
	  $scope.logout = function() {
	  	$ionicHistory.clearHistory();// clears the whole app history.. returns nothing.
	  	
	  	// clears the cache of whole app and returns promise
	  	$ionicHistory.clearCache().then(function(){ 
		    AuthService.logout();
		    $state.go('login');
	  	});
	  };
	  
	  //function to show quick search form
	  $scope.quickSearch = function() {
		  // to reload quick search form when moving to quick search form from other states (except quick search form).
		  $ionicHistory.clearCache().then(function(){ 
			  $state.go('menu.quicksearch', {}, {reload: true});
		  });
	  };
	
	/*$scope.performUnauthorizedRequest = function() {
    $http.get('http://localhost:8100/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
 
  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:8100/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };*/
	  
});