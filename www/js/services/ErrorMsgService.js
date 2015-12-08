/**
 * 
 */

angular.module('cdc')
 
.service('ErrorMsgService', function(ERROR, $ionicPopup) {
	
	// (showError method):
	// error_status can be a error code in error-messages.js or our own error message. 
	// But the popup title will be 'Warning' always.
	var error = function (error_status) {
		
		var errShown = false;
		
		for(var i=0; i<ERROR.length; i++) {
			console.log(ERROR[i].code);
			if(error_status == ERROR[i].code) {
				$ionicPopup.alert({
			        title: 'Warning',
			        template: ERROR[i].message
			    });
				errShown = true;
			  	break;
			}
		}
		
		// warning message to show if no warning message shown in the above code.
		if(!errShown) {
			$ionicPopup.alert({
		        title: 'Warning',
		        template: error_status
		    });
		}
	};

	// (showOwnError method):
	// error_status can be a error code in error-messages.js or our own error message. 
	// error_title will be the ionicPopup title.
	var titleAndError = function (error_title, error_status) {
		
		var errShown = false;
		
		for(var i=0; i<ERROR.length; i++) {
			console.log(ERROR[i].code);
			if(error_status == ERROR[i].code) {
				$ionicPopup.alert({
			        title: error_title,
			        template: ERROR[i].message
			    });
				errShown = true;
			  	break;
			}
		}
		
		// warning message to show if no warning message shown in the above code.
		if(!errShown) {
			$ionicPopup.alert({
		        title: error_title,
		        template: error_status
		    });
		}
		
	};
	
	//setting each function to a name (name: function in return statement), so that the functions can be accessed as WSCallService.name();
	// for accessing httpGet function: WSCallService.httpGet();
	return {
		error: error,
		titleAndError: titleAndError
	};
	
});

