var gulp = require('gulp'),
    concatCSS = require('gulp-concat-css'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    uncss = require('gulp-uncss'),
    notify = require('gulp-notify'),
	wiredep = require('wiredep').stream;

//gulp-connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});


//bower
gulp.task('bower', function() {
  gulp.src('./app/index.html')
  	.pipe(wiredep({
  		directory: 'app/bower_components'
  	}))
  	.pipe(gulp.dest('./app'))
  	.pipe(connect.reload())
  	.pipe(notify('bower was changed Succesful'));
});

//css
gulp.task('css', function () {
	gulp.src('./css/*.css')
		.pipe(concatCSS("*.css"))
		.pipe(uncss({
			html: ['app/index.html']
		}))
		.pipe(minifyCSS())
		.pipe(rename('css.min.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(connect.reload())
		.pipe(notify('Css was changed Succesful'));
});

//html
gulp.task('html' , function () {
	gulp.src('./index.html')
		.pipe(rename('index.html'))
		.pipe(gulp.dest('app'))
		.pipe(connect.reload())
		.pipe(notify('HTML was changed Succesful'));
});

//img
gulp.task('img' , function () {
	gulp.src('./img/*')
		.pipe(gulp.dest('app/img'))
		.pipe(connect.reload())
		.pipe(notify('Img was changed Succesful'));
});
//js
gulp.task('js' , function () {
	gulp.src('./js/*.js')
		.pipe(gulp.dest('app/js'))
		.pipe(connect.reload())
		.pipe(notify('js was changed Succesful'));
});

//watch
gulp.task('watch', function () {
	gulp.watch(['./bower.json'], ['bower']);
	gulp.watch(['./css/*.css'], ['css']);
	gulp.watch(['./index.html'], ['html']);
	gulp.watch(['./js/*.js'], ['js']);
	gulp.watch(['./img/*'], ['img']);
});

gulp.task('default', ['connect', 'watch']);
