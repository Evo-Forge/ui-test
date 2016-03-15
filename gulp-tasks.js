var 
	path = require('path'),
	gulp = require('gulp'),
	less = require('gulp-less'),
	watch = require('gulp-watch'),
	rename = require('gulp-rename'),
	jade = require('gulp-jade');
require('colors');

var pubDir = path.join( __dirname, 'pub' );
// compile css
var lessDir = path.join(__dirname, 'src', 'styles', '**', '*.less');
function compileCss()
{
	gulp.src( lessDir )
		.pipe( less({ paths: [ path.join( __dirname, 'src', 'less' ) ] }) )
		.pipe( gulp.dest( path.join( pubDir, 'css' ) ));
	console.log( ['+', 'CSS'.blue, 'compiled'].join(' ') );
}
compileCss();
watch(lessDir, compileCss );

// "compile" js
var jsDir = path.join(__dirname, 'src', 'scripts', '**', '*.js'),
		jsDestDir = path.join( pubDir, 'js');
function compileJs() // actually just copy XD, also needs cleaning first
{
	gulp.src(jsDir).pipe(gulp.dest(jsDestDir));
	gulp.src(path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.js'))
		.pipe(rename('jquery.js'))
		.pipe(gulp.dest(path.join(jsDestDir, 'lib')))
	gulp.src(path.join(__dirname, 'node_modules', 'angular', 'angular.js'))
		.pipe(rename('angular.js'))
		.pipe(gulp.dest(path.join(jsDestDir, 'lib')))
	gulp.src(path.join(__dirname, 'node_modules', 'angular-ui-router', 'release', 'angular-ui-router.js'))
		.pipe(rename('router.js'))
		.pipe(gulp.dest(path.join(jsDestDir, 'lib', 'angular')))
	gulp.src(path.join(__dirname, 'node_modules', 'requirejs', 'require.js'))
		.pipe(gulp.dest(path.join(jsDestDir, 'lib')))	
	gulp.src(path.join(__dirname, 'node_modules', 'text', 'text.js'))
		.pipe(gulp.dest(path.join(jsDestDir, 'lib', 'require')))	
  console.log( ['+', 'JS'.blue, 'compiled'].join(' ') );
}
compileJs();
watch(jsDir, compileJs );

// copy public stuff
var imgDir = path.join(__dirname, 'src', 'img', '**', '*.+(png|jpg|jpeg|gif|svg)'),
		fontDir = path.join(__dirname, 'src', 'font', '**', '*.+(eot|ttf|woff|woff2|svg|otf)');
		resDir = path.join(__dirname, 'src', 'resources', '**', '*.+(json)');
function copyPublic()
{
	gulp.src(imgDir).pipe(gulp.dest( path.join( pubDir, 'img') ));
	gulp.src(fontDir).pipe(gulp.dest( path.join( pubDir, 'font') ));
	gulp.src(resDir).pipe(gulp.dest( path.join( pubDir, 'res') ));
	console.log( ['+', 'Public'.blue, 'files copied'].join(' ') );
}
copyPublic();
watch([imgDir, fontDir, resDir], copyPublic );

// compile angular templates from jade
var uiTplDir = path.join(__dirname, 'src', 'views', '_ui-tpl', '**', '*.jade')
function compileTpl()
{
	gulp.src(uiTplDir).pipe(jade()).pipe(gulp.dest( path.join(pubDir, 'tpl' ) ));
	console.log( ['+', 'UI templates'.blue, 'compiled'].join(' ') );
}
compileTpl()
watch(uiTplDir, compileTpl);
