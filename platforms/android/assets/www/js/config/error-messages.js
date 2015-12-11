/**
 * Contains all constants for error messages for each error code
 * ERROR constant is used only in ErrorMsgService.js
 * 
 * status=0 means unable to connect server (net::ERR_CONNECTION_REFUSED)
 * status=400 means Bad Request
 * status=404 means URL not found
 */ 

angular.module('cdc')
 
.constant('ERROR',(function(){
	
	return [
	  
	  {code: '0', message: 'Unable to connect the server. Please try again later !'},
	  {code: '404', message: 'Requested URL not found'},
	  {code: 'UPI', message: 'Username or Password is incorrect'},
	  
	];

})());