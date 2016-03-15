// get all files
var allTestFiles = [],
		allTplFiles = [],
		TEST_REGEXP = /(spec|test)\.js$/i,
		TEST_TPL_REGEXP = /tpl\/.+\.html$/i;
for( var file in window.__karma__.files )
{
	if( TEST_TPL_REGEXP.test(file) ) allTplFiles.push(file);
  if( TEST_REGEXP.test(file) ) allTestFiles.push(file);
}
// set require.js config for uni tests
require.config
({
  baseUrl: '/base/pub/js',
  deps: allTestFiles,
  callback: window.__karma__.start,
  paths: 
  {
    'angular': 'lib/angular',
    'jquery': 'lib/jquery',
    'angular/mock': [ '../../test/angular-mocks' ],
    //'settings': [ 'test/unit.prep' ],
    'text': 'lib/require/text'
  },
  shim: 
  {
    'angular': { exports: 'angular' },
    'angular/mock': [ 'angular' ],
    'jquery': { 'exports' : 'jquery' },
    'angular/router': [ 'angular' ]
  }
});
