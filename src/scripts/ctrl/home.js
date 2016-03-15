define([ 'angular', 'srv/data', 'dir/table' ], 
function homeControllerModule( angular, dataSrvMod, table ) 
{
	'use strict';

	return [dataSrvMod, table, angular.module('core.components')
	.filter('prettyColHeader', () =>
	{
		return (val) => val.replace('_', ' ')
	})
	.filter('keysLength', () =>
	{
		return (val) => Object.keys(val).length
	})
	.controller('HomeCtrl', [ '$scope', '$timeout', 'api', '$compile', 
		function($scope, $timeout, api, $compile)
	{
		$scope.data = []; // table data
		$scope.maxRows = 20; // max display rows
		$scope.cols = []; // table cols
		
		// compat
		if(!Proxy) Object.observe($scope.selected.ids, changes => 
		{
			for( let change of changes ) 
				if( change.object[change.name] == undefined ) 
					$timeout(()=>delete change.object[change.name]);
		})
		else
		{
			let selectedIdsHandler = 
			{
				set: (obj, prop, value) => value == undefined ? delete obj[prop] : obj[prop] = value,
			  get: (obj, prop) => obj[prop]
			};
			$scope.selected = {};
			$scope.selected.ids = new Proxy({}, selectedIdsHandler);
		}
		
		$scope.setMaxRows = val=>$scope.maxRows = val; 
		// set col header values on data change
		$scope.$watchCollection('data', (newData)=> newData.length && ($scope.cols = Object.keys(newData[0])) );
		// get data from api
		api.getAll().then( res => 
		{
			$scope.data = res.data
		});

		$scope.$watch('checkAll', (newVal) =>
		{ 
			if( !$scope.filteredRows ) return;
			for( let row of $scope.filteredRows ) $scope.selected.ids[row.id] = newVal;
		});

	}])]
});