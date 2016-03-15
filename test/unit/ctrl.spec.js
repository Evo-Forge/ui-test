define([ 'angular/mock', 'app', 'srv/data', 'ctrl/home'], 
function()
{
	var apiData = [{"id": 1, "name": "John"}, {"id": 2, "name": "Tom"}];
	describe('main', function()
	{
		var $controller, $rootScope, $injector;
		beforeEach(module('core'));
		beforeEach(module('data-services'));
		beforeEach(inject(function(_$controller_, _$rootScope_, _$injector_)
		{ 
			$controller = _$controller_; 
			$rootScope = _$rootScope_;
			$injector = _$injector_;

			$httpBackend = $injector.get('$httpBackend');
			// TODO get url from api service
			$httpBackend.when('GET', '/pub/res/MOCK_DATA_1000.json').respond(JSON.stringify(apiData))
		}));
		
		describe('controllers', function()
		{
			var $mainScope, $homeScope, MainCtrl, HomeCtrl;
	    beforeEach(function()
	    {
	      $mainScope = $rootScope.$new(true);
	      $homeScope = $rootScope.$new(true);

	      MainCtrl = $controller('MainCtrl', { $scope: $mainScope });
	      HomeCtrl = $controller('HomeCtrl', { $scope: $homeScope });
	    });

			it('should have correct variables', function()
			{
				expect(typeof $homeScope.data).toBe('object');
				expect($homeScope.data).toEqual([]);
				expect(typeof $homeScope.cols).toBe('object');
				expect($homeScope.cols).toEqual([]);
			});

			it('should have correct data', function()
			{
				$homeScope.$digest();
				$httpBackend.flush();
				expect($homeScope.data).toEqual(apiData)
				expect($homeScope.cols).toEqual(['id', 'name']); // after $watch
			});

		})

	});
});