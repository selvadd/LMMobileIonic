/**
 * 
 */

angular.module('cdc')

.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'login/login.html',
    controller: 'loginController'
  });
  
})

.controller('loginController', function($scope, $state, $ionicPopup, AuthService) {
	$scope.submitted = false;
	
  $scope.data = {};
 
  $scope.login = function(data, form) {
	  //console.log(form.$valid);
	  $scope.submitted = true;
	  
	  //dont submit form if validation fails
	  if(!form.$valid) {
		  return false;
	  }
	
	  //shows loading text
	 $scope.showLoading();
	
    AuthService.login(data.username, data.password).then(function(authenticated) {
      
      $scope.setCurrentUsername(data.username);
      $state.go('menu.home', {}, {reload: true});
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