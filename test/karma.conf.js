module.exports = function(config)
{
	var TPL_RE = /(.+)(tpl\/.+\.html)$/i;

	config.set
	({
		basePath: '../',
		frameworks: ['jasmine', 'requirejs'],
    //singleRun: true,
    browsers: [ 'Chrome' ],
    files: 
    [
    	'test/unit.js',
      { pattern: 'pub/js/**/*.js', included: false },
      { pattern: 'pub/tpl/**/*.html', included: false },
      { pattern: 'test/angular-mocks.js', included: false },
      //{ pattern: 'test/unit.prep.js', included: false },
      { pattern: 'test/unit/**/*.js', included: false }
    ],
    exclude: [ 'tests/e2e/**/*.js' ],
    reporters: [ 'progress', 'coverage' ],
    coverageReporter: 
    {
      type : 'html',
      dir : '../test-report/coverage/'
    },
    preprocessors: 
    { 
    	'../pub/tpl/**/*.html': ['generic'/*, 'ng-html2js'*/],
      '**/*.js': ['coverage']
    },
    genericPreprocessor: 
    {
      rules: 
      [{ // replace template paths
        match: '**/*.html',
        process: function (content, file, done, log) 
        {
        	file.path = file.originalPath.replace(TPL_RE, '/$2');
          log.debug('Processing "%s".', file.originalPath, "->", file.path);
          done(content);
        }
      }]
    }
	})
}