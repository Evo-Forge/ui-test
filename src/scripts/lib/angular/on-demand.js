define(['angular'], function(angular)
{
	(function(angularModule) // add angular list of modules to it
	{
    angular.modules = [];
    angular.module = function() 
    {
      if (arguments.length > 1) 
        angular.modules.push(arguments[0]);
      return angularModule.apply(null, arguments);
    }
	})(angular.module);
	
	return angular.module('onDemand', [])
	// on demand load provider
	.provider('onDemand', 
	[ '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$injector',
	function( $controllerProvider, $compileProvider, $filterProvider, $provide, $injector )
	{
		// start with a list of already loaded modules length
		var moduleQueueLen = {},
	  // known providers we can invoke
  	providers = 
		{
      $controllerProvider: $controllerProvider,
      $compileProvider: $compileProvider,
      $provide: $provide,
      $filterProvider: $filterProvider,
      $injector: $injector
    };
    // populate module queue length list, requires custom overwrite (see: overwrites.js)
	  for (var i = angular.modules.length - 1; i >= 0; i--) 
	  	moduleQueueLen[angular.modules[i]] = angular.module(angular.modules[i])._invokeQueue.length;
	  
    this.$get = ['$q', '$rootScope', function($q, $rootScope)
    {
    	return {
    		// load module using require and inject
				load: function load() 
		    {	
		    	var paths = Array.prototype.slice.call(arguments);
		    	var dfd = $q.defer(); 
		    	// result should be an angular module
					require( paths, function( result )
					{ 
						if( !result ) return false;
						if( !angular.isArray(result) ) result = [result];
						for( var i = 0; i < result.length; i++ ) 
						{
							for(var k = moduleQueueLen[result[i].name]||0; k<result[i]._invokeQueue.length; k++ )
							{
								var call = result[i]._invokeQueue[k],
										provider = providers[call[0]]; 
					    	if( provider ) provider[call[1]].apply(provider, call[2]);
								angular.element(document).injector().invoke(function($rootScope){ $rootScope.$apply(); });
							}
							// update module queue list length
							moduleQueueLen[result[i].name] = result[i]._invokeQueue.length; 
							// run blocks :))
							// TODO: add this to some queue beacause it's getting called a zillion times!
							for (var j = result[i]._runBlocks.length - 1; j >= 0; j--)
								providers.$injector.invoke(result[i]._runBlocks[j]);
						};
						dfd.resolve(result);
					}); 
					return dfd.promise;
		    }
    	}
    }];
	}]);
});