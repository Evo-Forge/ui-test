define(['angular'],
function tableDirective() 
{
	'use strict';

	return angular.module('core.components')
		/*!
		 * chunks data from some ngRepeat like collection in multiple 
		 * element clones, useful for runtime table interaction optimization
		 * like scrolling through a table with a lot of DOM nodes, 
		 * could show/hide tbody siblings based on scroll position
		 * (yes, it's far much better performance to "display: none" 
		 * than to do remove and add into the tree)... but I'm not going to do that here
		 */
		.value('core.components.TABLE_CHUNK', 50) // default chunk value

		.directive('tableChunk', 
		['$compile', '$timeout', 'core.components.TABLE_CHUNK', 
		( $compile,   $timeout,   tableChunkSize ) => 
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

	 		    var elemParent = tElem.parent();

					return (scope, elem, attrs, ctrl, transclude) =>
					{
						var elemClone = elem.clone(),
								siblings = [],
								scopes = [],
								loopThrough = items =>
								{
									for( var i=0; i<items.length; i++)
									{
										var itemScope = scope.$new();
										scopes.push(itemScope);
										itemScope[valueIdentifier] = items[i];
										transclude(itemScope, clone => elem.append(clone) )
										if( !(i%tableChunkSize) && i>0 ) 
										{ 
											var newElem = elemClone.clone(); 
											siblings.push(newElem);
											((newElem, elem)=>{ $timeout(()=>{ elem.after(newElem) }, 100); })(newElem, elem) 
											elem = newElem 
										}
									}
								};
						// watch data collection
						scope.$watchCollection(collection, data =>
						{
							// cleanup
							elem.html('')
							for( let s of siblings ){ s.remove(); }
							siblings = siblings.splice(0, siblings.length);
							for( let s of scopes ) s.$destroy(); 
							scopes = scopes.splice(0, scopes);
							
							elemParent.append(elem);
							siblings.push(elem);
							if( alias ) scope[alias] = data;
							var firstPart = data.slice(0, tableChunkSize),
									theRest = data.slice(tableChunkSize, data.length);
							loopThrough(firstPart);
							$timeout(()=>loopThrough(theRest), 1);
						});
					}
				}
			}
		}]);
})