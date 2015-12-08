/**
 * Contains a constant value for each web service url
 */

angular.module('cdc')

.constant('WS_URI',(function(){
	
	//Webservice URL. Change the ip address accordingly.
	var main_url = 'http://10.10.0.100:8080/restws';
	//var main_url = 'http://www5.cdcnews.com/restws';
	
	return {
		
		MAIN : main_url,
		LOGIN : main_url + '/services/login',
		LOGOUT : main_url + '/services/logout',
		QUICK_SEARCH : main_url + '/services/quickSearchFormDetails',
		QUICK_SEARCH_RESULTS : main_url + '/services/quickSearchResults',
		PROJECT_DETAILS : main_url + '/services/projectDetails',
		PUBLIC_PROJECT_DETAILS : main_url + '/services/publicProjectDetails',
		PROJECT_DETAILS_BY_CDCID : main_url + '/services/projectDetailsByCdcId',
		
	};
	
	
})());