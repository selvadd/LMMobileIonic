/**
 * Contains all constants except web service urls that are used in the application
 */ 

angular.module('cdc')
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
})

.constant('ID',{
	//site_id for LM Mobile.
	SITE_ID: '0'
})

//keys used to store value in local storage. Used to set and get values in local storage 
.constant('LOCAL_STORAGE_KEYS',{
	SECURITY_KEY: 'securityKey',
	SESSION_ID: 'sessionId'
});