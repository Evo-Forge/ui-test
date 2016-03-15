module.exports = function(grunt) 
{
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig
  ({
    pkg: grunt.file.readJSON('package.json'),

		express: 
    {
      admin:{ options: { port: 7357, script: 'index.js' } }
    },
    karma: 
    { 
      options: { configFile: 'test/karma.conf.js', logLevel: 'DEBUG' },
      unit: {} 
    },
    protractor: 
    { 
      options: { configFile: 'test/protractor.conf.js', keepAlive: true, webdriverManagerUpdate: true },
      e2e: {}
    },
    protractor_webdriver: { options: { keepAlive:true }, e2e: {} }

  });

  grunt.registerTask('unit', [ 'karma' ]);
  grunt.registerTask('e2e', [ 'express:test', 'protractor_webdriver', 'protractor' ]);

}