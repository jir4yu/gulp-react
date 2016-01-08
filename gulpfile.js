var gulp = require('gulp');
var fs = require("fs");
var browserify = require('browserify');
var babelify = require("babelify");
var sass = require('gulp-sass');

var paths = {
  sass: './scss/*.scss', // change path here.
  js: './js/**/*.js' // change path here.
};

gulp.task('babel', function() {
	browserify('./js/app.js', {debug: true}) // change your main file here.
	.transform('babelify', {presets: ['es2015', 'react']})
	.bundle()
	.pipe(fs.createWriteStream('./dist/build.js'));
});

gulp.task('sass', function() {
	return gulp.src('./scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['babel']);
});

gulp.task('default', ['watch', 'babel', 'sass']);