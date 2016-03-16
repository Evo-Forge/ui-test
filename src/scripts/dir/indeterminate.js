define(['angular', 'app'],
function tableDirective(A) 
{
	'use strict';

	return angular.module('core.components')
	.directive('indeterminate', function()
	{
		return {
			scope: true,
			require: '?ngModel',
			link: function(scope, elem, attrs, modelCtrl) 
			{
				if( !attrs.indeterminate ) return;
				var boundData = scope.$eval(attrs.indeterminate);
				if( !A.isArray(boundData) && !A.isObject(boundData) ) return;

				// watch collection for changes
				scope.$watchCollection(attrs.indeterminate, newVal =>
				{
					if(!newVal) return
					boundData = scope.$eval(attrs.indeterminate);
					var workArray = [];
					if( A.isObject(newVal) ) for( let i in newVal ) workArray.push(newVal[i]);
					else workArray = newVal;
					var allTrue = workArray.every(elem=>elem);
					elem.prop('checked', allTrue );
					elem.prop('indeterminate', !allTrue && workArray.some(elem=>elem) )
				} )

				var h = ()=>
				{
					var checked = elem.prop('checked');
					if( A.isArray(boundData) ) for( let i of boundData ) i = checked;
					if( A.isObject(boundData) ) for( let i in boundData ) boundData[i] = checked;
				}
				attrs.ngModel && scope.$watch( attrs.ngModel, n => { n && elem.prop('checked', true); h() } );
				// toggle functionallity
				elem.bind('change', () => scope.$apply(h) )
			}
		}

	})
})