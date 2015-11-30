// CDC LM Mobile app

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'cdc' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//'ngMockE2E' is included to add angular-mocks dependency to our module. angular-mocks is used for dummy backend

angular.module('cdc', ['ionic'])

.config(function ($urlRouterProvider, $ionicConfigProvider) {
	
  $urlRouterProvider.otherwise(function ($injector) {
	  
	  // to show home page, instead of login page, if user already logged in
	  $injector.get("$state").go("menu.home");
  });
  
  // To center align the title in both IOS and Android.
  // Android's default alignment of titles is left alignment. Below line resolves this.
  $ionicConfigProvider.navBar.alignTitle('center');
  
})


.run(function($ionicHistory, $ionicPlatform, $rootScope, $state, AuthService, AUTH_EVENTS) {
	
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  
  //This function is called while clicking back button in mobile devices
	// Used to decide whether to go back or exit the app
	$ionicPlatform.registerBackButtonAction(function() {
		console.log($state.current.name);
	  if ($state.current.name == "menu.home" || $state.current.name == "login") {
		  navigator.app.exitApp();
	  } else {
		  $ionicHistory.goBack();
		  //navigator.app.goBack();
	  }
	},100);
  
	// state change listener
	$rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
		
		// check whether user logged in before moving to another state
	    if (!AuthService.isAuthenticated()) {
	    	//condition to check the next state name is 'login' or not
	      if (next.name !== 'login') {
	        event.preventDefault();
	        
	        // move to login page if user is not authenticated.
	        $state.go('login');
	        
	        //check to not to show session lost message when opening the app
	        if(fromState.name!='') {
	        	$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	        }
	        
	      }
	    }
	    
	    // check whether user is authorized to view the next state
		if ('data' in next && 'authorizedRoles' in next.data) {
	      
			var authorizedRoles = next.data.authorizedRoles;
	      
			if (!AuthService.isAuthorized(authorizedRoles)) {
	    	  console.log('!AuthService.isAuthorized');
	    	  event.preventDefault();
	    	  $state.go($state.current, {}, {reload: true});
	    	  $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
			}
	      
	    }
 
	    
	});
})