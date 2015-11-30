/**
 * AppController is used as the Controller of index.html
 * Parent of All Controllers of this app. methods and variables in this controller can be used in all Controllers
 */

angular.module('cdc')

.controller('appController', function($scope, $state, $location, $ionicPopup, $ionicHistory, $ionicPlatform, $ionicLoading, AuthService, AUTH_EVENTS) {
  
	$scope.username = AuthService.username();

	// this event will be shown if user is not authorized to view the page
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });
 
  //this event will be shown if user session has timed out and moves to login screen
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    var alertPopup = $ionicPopup.alert({
        title: 'Session Lost!',
        template: 'Sorry, You have to login again.'
      });
    //$state.go('login');
  });
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
  
  //function of back button
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  
  //function to clear all the cached values
  $scope.clearCache = function() {
	 $ionicHistory.clearCache();
  };
  
  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>',
      noBackdrop : false
    });
  };
  
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };
	  
});

