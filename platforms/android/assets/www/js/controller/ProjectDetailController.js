/**
 * 
 */
angular.module('cdc')

.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
  .state('project-detail', {
    url: '/online-product/project-details-by-cdcid',
    params: {'id': null},
    templateUrl: 'online_product/project_detail/project_detail.html',
    controller: 'contentDetailController'
  });
  
})

.controller('contentDetailController', function($scope, $state, $http, URLS, LOCAL_STORAGE_KEYS, $stateParams) {
	
	//console.log($stateParams.id);
	
	$scope.showLoading();
	
	var jsonData = {
   		'sessionId' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_ID),
   		'securityKey' : window.localStorage.getItem(LOCAL_STORAGE_KEYS.SECURITY_KEY),
   		'ids' : $stateParams.id
   	};
		
	 $http({
		    method : 'GET',
		    url : URLS.WS_URL+'/online-product/project-details-by-ids',
		    params : jsonData
		}).success(function(data, status, headers, config) {
			console.log(data.Data[0]);
			/*console.log(data.Data[0].city);*/
			$scope.projectDetail = data.Data[0];
			$scope.hideLoading();
		}).error(function(data, status, headers, config) {
			console.log('error');
			console.log(data+' '+status);
			$scope.hideLoading();
		}).finally(function(data){
			$scope.hideLoading();
		});
	
});