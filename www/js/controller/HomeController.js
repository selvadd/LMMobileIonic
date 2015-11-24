/**
 * 
 */

angular.module('cdc')

.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
	  
	/*$stateProvider
	  .state('home', {
	    url: '/online-product/home',
	    templateUrl: 'online_product/userhome.html',
	    controller: 'homeController'
	  })*/
	  
	//Renamed 'home' to 'menu.home' to make sidemenu work in home page
	  $stateProvider
	  .state('menu.home', {
	    url: '^/online-product/home',
    	views: {
            'bodyContent' :{
              templateUrl: "online_product/userhome.html",
              controller: 'homeController'
            }
          }
	  });
	  
})

.controller('homeController', function($scope, $state, $ionicPopup) {
	 
	$scope.quickSearch = function() {
	  $state.transitionTo('quicksearch',{},{reload: true});
	};
	
});

