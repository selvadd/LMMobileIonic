angular.module('cdc')
 
.service('AuthService', function($q, $http, USER_ROLES, WS_URI, ID, LOCAL_STORAGE_KEYS, WSCallService) {
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;
  var userSessionId;
  
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_STORAGE_KEYS.SECURITY_KEY);
    var sessionId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID);
    if (token) {
      useCredentials(token,sessionId);
    }
  }
 
  function storeUserCredentials(token,sessionId) {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.SECURITY_KEY, token);
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.SESSION_ID, sessionId);
    useCredentials(token,sessionId);
  }
 
  function useCredentials(token,sessionId) {
    //username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;
    userSessionId = sessionId;
    /*if (username == 'admin') {
      role = USER_ROLES.admin
    }
    if (username == 'user') {
      role = USER_ROLES.public
    }*/
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    userSessionId = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.SECURITY_KEY);
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.SESSION_ID);
  }
 
  var login = function(name, pw) {
	  
    return $q(function(resolve, reject) {
    
      var jsonData = {
		  'username' : name,
		  'pwd' : pw,
		  'siteId' : ID.SITE_ID
      };

      WSCallService.httpGet(WS_URI.LOGIN, jsonData).then(function(result) {
		  console.log(result.data);
		  
		  if(result.data!=undefined) {
				if (result.data.iTotalRecords==1) {
					
					username = name;
			        // Make a request and receive your auth token from your server
			        storeUserCredentials(result.data.securityKey, result.data.sessionId);
			        resolve('Login success.');
				} else {
					reject('UPI');
				}
			} else {
				reject('Unable to process your request. Please try later !');
			}
		  
	  }, function(error) {
		  console.log(error.status);

		  reject(error.status);
		  
	  });
      
    });
    
  };
 
  var logout = function() {
    
	var sessionId = window.localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID);
	var securityKey = window.localStorage.getItem(LOCAL_STORAGE_KEYS.SECURITY_KEY);
	
	if(sessionId!=undefined && securityKey!=undefined) {
		
		var jsonData = {
		  'sessionId' : sessionId,
		  'securityKey' : securityKey
	  	};
		
		WSCallService.httpGet(WS_URI.LOGOUT, jsonData).then(function(result) {
			console.log(result.data);
		}, function(error) {
			
		});
		
	}
    
    destroyUserCredentials();
    
  };
 
  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})

/*.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})*/;

