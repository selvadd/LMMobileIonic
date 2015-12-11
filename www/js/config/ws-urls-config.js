/**
 * Contains a constant value for each web service url
 */

angular.module('cdc')

.constant('WS_URI',(function(){
	
	//Webservice URL. Change the ip address accordingly.
	
	// Local Server
	//var main_url = 'http://10.10.0.100:8080/restws';
	
	// 46 QA Server
	//var main_url = 'http://192.168.22.46:8080/restws';
	
	// 73 Production Server
	var main_url = 'http://www5.cdcnews.com/restws';
	
	return {
		
		MAIN : main_url,
		LOGIN : main_url + '/services/login',
		LOGOUT : main_url + '/services/logout',
		QUICK_SEARCH : main_url + '/services/quickSearchFormDetails',
		QUICK_SEARCH_RESULTS : main_url + '/services/quickSearchResults',
		PROJECT_DETAILS : main_url + '/services/projectDetails',
		PUBLIC_PROJECT_DETAILS : main_url + '/services/publicProjectDetails',
		PROJECT_DETAILS_BY_CDCID : main_url + '/services/projectDetailsByCdcId',
		SAVED_SEARCH_LIST : main_url + '/services/savedSearchList',
		SAVED_SEARCH_INFO : main_url + '/services/savedSearchInfo',
		UPDATE_DELETE_SAVED_SEARCH : main_url + '/services/updateDeleteSavedSearch',
		UPDATE_SS_EMAIL_REMINDER : main_url + '/services/updateEmailReminder',
		UPDATE_SAVED_SEARCH : main_url + '/services/updateSavedSearch',
		INSERT_SAVED_SEARCH : main_url + '/services/insertSavedSearch',
		COPY_SAVED_SEARCH : main_url + '/services/copySavedSearch',
		SAVE_SEARCH : main_url + '/services/saveSearch',
	};
	
	
})());