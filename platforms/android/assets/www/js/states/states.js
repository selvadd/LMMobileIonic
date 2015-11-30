/**
 * All states has to be declared in this file 
 */

angular.module('cdc')

.config(function($stateProvider) {

	// Login Page
	$stateProvider.state('login', {
		url : '/login',
		templateUrl : 'views/login/login.html',
		controller : 'loginController'
	});
	
	// Left Side Menu
	$stateProvider.state('menu', {
		url : '/menu',
		abstract: true,
		templateUrl : 'templates/menu.html',
		controller : 'menuController'
	})
	
	// Home page or landing page
	.state('menu.home', {
		url : '^/home',
		templateUrl : "views/home.html",
		controller : 'homeController'
	})
	
	// Quick Search form
	.state('menu.quicksearch', {
		url : '^/quicksearch',
		templateUrl : "views/quicksearch/quicksearch.html",
		controller : 'quickSearchController'
	})
	
	// Quick Search Results
	.state('menu.quicksearchresults', {
		url : '^/quicksearchresults',
		params : {
			'selectedData' : null
		},
		templateUrl : "views/searchresults/searchresults.html",
		controller : 'quickSearchResultsController'
	})
	
	// Project Detail Page
	.state('menu.project-detail', {
		url : '^/project-detail',
		params : {
			'id' : null
		},
		templateUrl : "views/project_detail/project_detail.html",
		controller : 'projectDetailsController'
	})

	// Quick Links
	.state('menu.quicklinksresults', {
		url : '^/quicklinksresults',
		params : {
			'selectedData' : null
		},
		templateUrl : "views/searchresults/searchresults.html",
		controller : 'quickLinksResultsController'
	});

})