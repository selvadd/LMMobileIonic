// CDC LM Mobile app

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'cdc' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//'ngMockE2E' is included to add angular-mocks dependency to our module. angular-mocks is used for dummy backend

angular.module('cdc', ['ionic'])

.run(function($ionicPlatform) {
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
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("menu.home");
  });
  
  // To center align the title in both IOS and Android.
  // Android's default alignment of titles is left alignment. Below line resolves this.
  $ionicConfigProvider.navBar.alignTitle('center');
  
})

/*.run(function($httpBackend){
    $httpBackend.whenGET('http://localhost:8100/valid')
        .respond({message: 'This is my valid response!'});
  $httpBackend.whenGET('http://localhost:8100/notauthenticated')
        .respond(401, {message: "Not Authenticated"});
  $httpBackend.whenGET('http://localhost:8100/notauthorized')
        .respond(403, {message: "Not Authorized"});
  $httpBackend.whenGET('http://localhost:8080/RestfulWS_Server/demo/helloworld')
  	.respond({message: 'Helloworld!'});*/
    
  //$httpBackend.whenGET(/demo\/\w+.*/).passThrough();
//})

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
 
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
 
    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
})