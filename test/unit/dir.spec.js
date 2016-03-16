define(['angular/mock', 'app', 'dir/indeterminate'], 
function(mock, app, indeterminate)
{
	describe('directives', function()
	{
		var $compile, $rootScope, someCtrlScope, indetElem;
		beforeEach(module('core'));
		beforeEach(module('core.components'));
		beforeEach(inject(function(_$compile_, _$rootScope_, $injector)
		{
			$compile = _$compile_;
			$rootScope = _$rootScope_;

			someCtrlScope = $rootScope.$new();
			someCtrlScope.selected = {ids: {}}
			someCtrlScope.checkAll = false;
			indetElem = angular.element('<input type="checkbox" indeterminate="selected.ids" ng-model="checkAll" />');
			$compile(indetElem)(someCtrlScope);
		}));

		var setAllTo = (val) => { for( let i of [1,2,3,4,5] ) someCtrlScope.selected.ids[i] = typeof val == 'string' ? !!(i%2) : val };

		it('should be unchecked', () =>
		{
			someCtrlScope.$digest();
			someCtrlScope.$apply(setAllTo(false));
			someCtrlScope.$digest();
			expect(indetElem.prop('checked')).toEqual(false)
		})

		it('should be checked', () =>
		{
			someCtrlScope.$digest();
			someCtrlScope.$apply(setAllTo(true));
			someCtrlScope.$digest();
			expect(indetElem.prop('checked')).toEqual(true)
		})

		it('should be indeterminate', () =>
		{
			someCtrlScope.$digest();
			someCtrlScope.$apply(setAllTo('indet'));
			someCtrlScope.$digest();
			expect(indetElem.prop('indeterminate')).toEqual(true);
		});

		it('should change collection state', () =>
		{
			someCtrlScope.$digest();
			someCtrlScope.$apply( function(){ setAllTo(false); someCtrlScope.checkAll = true; } );
			someCtrlScope.$digest();
			var sids = someCtrlScope.selected.ids
			for( let i in sids ) expect(sids[i]).toEqual(true);
			//expect(indetElem.prop('indeterminate')).toEqual(false);
		});

	})
})