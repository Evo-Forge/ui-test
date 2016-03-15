define([ 'module', 'angular/router' ],
function(module, angular) 
{
	'use strict';
	var tplProviderFactory = function(stateName)
	{
		return ['$templateRequest', function($templateRequest)
		{ 
			return $templateRequest('/pub/tpl/'+stateName+'.html').then(function(tpl){ return tpl; });
		}];
	},
	onDemandProviderFactory = function(name)
	{
		return [ 'onDemand', function(onDemand)
		{
			return onDemand.load(name);
		}];
	};

	// config block
	return [ '$stateProvider', '$locationProvider', 'onDemandProvider', 
	function( $stateProvider, $locationProvider, onDemandProvider)
	{
		$stateProvider.state
		({
			name: 'home',
			url: '/',
			templateProvider: tplProviderFactory('home'),
			resolve: 
			{ 
				homeCtrl: onDemandProviderFactory('ctrl/home')
			}
		});
	}];

});