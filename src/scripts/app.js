define
([
	'jquery',
	'settings',
	'ctrl/main', 
	'angular/router', 
	'angular/on-demand'
], function()
{
	'use strict';

	// define main module
	return angular.module( 'core',
	[
		'onDemand',
		'core.components', 'core.settings',
		'ui.router',
	])
	
});