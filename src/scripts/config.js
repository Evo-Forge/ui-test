requirejs.config
({
	waitSeconds: 60,
  deps: [ 'main' ],
  paths: 
  {
    'jquery': 'lib/jquery',
    'angular': 'lib/angular',
    'text': 'lib/require/text'
  },
  shim: 
  {
    'jquery': { 'exports' : 'jquery' },
    'angular': { 'exports' : 'angular' },
    'angular/router': [ 'angular' ]
  }
});