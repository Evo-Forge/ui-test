define(['angular'],
function dataServiceModule() 
{
	'use strict';

	return angular.module('data-services', [])
		.factory('api', ['$http', ($http) =>
		{
			let apiUrl = '/pub/res/';
			return {
				getAll: () => 
				{
					return $http.get(apiUrl+'MOCK_DATA_1000.json')
				}
			}
		}])
})