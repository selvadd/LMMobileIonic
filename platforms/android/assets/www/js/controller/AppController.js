

angular.module('cdc')

// Parent of All Controllers of this app. methods and variables in this controller can be used in all Controllers

.controller('appController', function($scope, $state, $ionicPopup, $ionicHistory, $ionicLoading, AuthService, AUTH_EVENTS) {
  
	$scope.username = AuthService.username();
 
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });
 
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    var alertPopup = $ionicPopup.alert({
        title: 'Session Lost!',
        template: 'Sorry, You have to login again.'
      });
    $state.go('login');
  });
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
  
  //function of back button
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  
  //function of home button
  $scope.home = function() {
	 $state.go('menu.home');
  };

  //function to clear all the cached values
  $scope.clearCache = function() {
	 $ionicHistory.clearCache();
  };
  
  //function of logout button
  $scope.logout = function() {
	  $ionicHistory.clearCache();
	  $ionicHistory.clearHistory();
	    AuthService.logout();
	    $state.go('login');
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

