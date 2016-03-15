define([ 'angular/mock', 'app', 'ctrl/elements', 'ctrl/elements-archive', 'ctrl/media' ], 
function()
{
	describe('main', function()
	{
		var $controller, $rootScope;
		beforeEach(module('core'));
		beforeEach(inject(function(_$controller_, _$rootScope_)
		{ 
			$controller = _$controller_; 
			$rootScope = _$rootScope_;
		}));
		
		describe('controllers', function()
		{
			var $mainScope, $elemScope, $elemArchScope, $mediaScope,
					MainCtrl, ElementsCtrl, ElementsArchiveCtrl, MediaCtrl;
	    beforeEach(function()
	    {
	      $mainScope = $rootScope.$new(true);
	      $homeScope = $rootScope.$new(true);

	      MainCtrl = $controller('MainCtrl', { $scope: $mainScope });
	      HomeCtrl = $controller('HomeCtrl', { $scope: $homeScope });
	    });

			it('should have method required methods', function()
			{
				console.log($mainScope, $homeScope);
			});

		})

	});
});