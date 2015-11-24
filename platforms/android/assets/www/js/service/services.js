angular.module('cdc')
 
.service('AuthService', function($q, $http, USER_ROLES, URLS, ID, LOCAL_STORAGE_KEYS) {
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
    	
    	$http({
		    method : 'GET',
		    url : URLS.WS_URL+'/login/validation',
		    params : jsonData
		}).success(function(data, status, headers, config) {
			
			if (data.iTotalRecords==1) {
				
				username = name;
		        // Make a request and receive your auth token from your server
		        storeUserCredentials(data.securityKey, data.sessionId);
		        resolve('Login success.');
			} else {
				reject('Username or Password is incorrect');
			}
		      
		}).error(function(data, status, headers, config) {
			//console.log(data+' '+status);
			
			//status=400 means Bad Request
			//status=0 means unable to connect server (net::ERR_CONNECTION_REFUSED)
			if(status==400){
				reject('Please enter username and password');
			} else if(status==0){
				reject('Unable to connect the server. Please try again later.');
			}
		});
    	
   /* if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
        // Make a request and receive your auth token from your server
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
      } else {
        reject('Login Failed.');
      }*/
    
    });
    
  };
 
  var logout = function() {
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

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
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
});

