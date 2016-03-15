define(['module', 'app', 'routes', 'angular'], 
function(module, app, routes)
{
	'use strict';
	app.config(routes).run(function( $state ){ $state.transitionTo('home'); });
	angular.bootstrap(document, [app['name']]);
});