/**
 * 
 */

angular.module('cdc')

.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  
	$stateProvider
	  .state('menu', {
	    url: '/online-product/menu',
	    templateUrl: 'menu.html',
	    controller: 'menuController'
	  });
  
  /*.state('main.dash', {
    url: 'main/dash',
    views: {
        'dash-tab': {
          templateUrl: 'templates/dashboard.html',
          controller: 'MenuController'
        }
    }
  })
  .state('main.public', {
    url: 'main/public',
    views: {
        'public-tab': {
          templateUrl: 'templates/public.html'
        }
    }
  })
  .state('main.admin', {
    url: 'main/admin',
    views: {
        'admin-tab': {
          templateUrl: 'templates/admin.html'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  });*/
  
})

.controller('menuController', function($scope, $state, $http, $ionicPopup, AuthService, URLS, LOCAL_STORAGE_KEYS) {
  
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
  };
  
  $scope.getHelloWorld = function() {
	  
	  $http({
		    method : 'GET',
		    url : URLS.WS_URL+'/helloworld.json'
		}).success(function(data, status, headers, config) {
			console.log("success "+data);
		    $scope.response = data;
		}).error(function(data, status, headers, config) {
			 console.log(data);
		    $scope.response = "error " + data;
		});
    
  };*/
	  
});