helpers = require('./e2e.prep.js');
exports.config = 
{
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/**/*.js'],
  rootElement: 'html'
};
