define([ 'angular' ], 
function mainControllerModule( angular ) 
{
	'use strict';
	// parent for all controllers, loads first
	return angular.module('core.components', [])
	.controller('MainCtrl', [ '$scope', function($scope)
	{
		console.log('main loaded');
	}])
});