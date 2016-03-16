define(['angular'], function( angular ) 
{
	'use strict';
	/*!
	 * define constants as module_UPPERCASE_CONSTANT_NAME ex: core_SOME_LIST
	 */
	return angular.module('core.settings', [])
		.constant( 'core.components.TABLE_CHUNK', 100);
});