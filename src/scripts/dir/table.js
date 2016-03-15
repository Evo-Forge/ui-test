define(['angular'],
function tableDirective() 
{
	'use strict';

	return angular.module('core.components')
		.directive('tableChunk', ['$compile', '$rootScope', ($compile, $rootScope)=> 
		{
			return {
				restrict: 'A',
				scope: false,
				replace: true,
				priority: 1,
				transclude: true,
				compile: function(tElem, tAttrs)
				{
					// match expression ngRepeat like
					tElem.removeAttr('table-chunk');
					let expr = tAttrs.tableChunk,
							match = expr.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s*$/);
		      if( !match ) 
        		throw Error(`Unexpected expression '${expr}'`);

	 		    var [undefined, valueIdentifier, collection, alias] = match;

					return (scope, elem, attrs, ctrl, transclude) =>
					{
						var elemClone = elem.clone(),
								siblings = [],
								scopes = [];
						// watch data collection
						scope.$watchCollection(collection, data =>
						{
							// cleanup
							elem.contents().remove();
							for( let s of siblings ){ console.log(tElem.parent().find(s));s.remove(); }
							siblings = siblings.splice(0, siblings.length);
							for( let s of scopes ) s.$destroy(); 
							scopes = scopes.splice(0, scopes);

							if( alias ) scope[alias] = data;
							
							var dataChunks = [], currentChunk;
							for( var i=0; i<data.length; i++)
							{
								var itemScope = scope.$new();
								scopes.push(itemScope);
								itemScope[valueIdentifier] = data[i];
								transclude(itemScope, clone => elem.append(clone) )
								if( !(i%100) && i>0 ) 
								{ 
									var newElem = elemClone.clone(); 
									siblings.push(newElem)
									elem.after(newElem); 
									elem = newElem 
								}
							}
						})

					}
				}
			}
		}]);
})