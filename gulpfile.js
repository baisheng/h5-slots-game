const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const tap = require('gulp-tap');
const webpack = require('gulp-webpack');
const es2015 = require('babel-preset-es2015');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync')
  .create();
const fs = require('fs');
const proxyMiddleware = require('http-proxy-middleware');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const uglify = require('gulp-uglify');
//const cssnano = require('gulp-cssnano');
//配置请求的地址
const proxyTable = {
	'/fiveticket': {
		target: 'http://100jc.net/fiveticket',
		changeOrigin: true,
		logLevel: 'debug'
	}
}

const proxyArr = [];
Object.keys(proxyTable).forEach(function(context){
	var options = proxyTable[context];
	if(typeof options === 'string'){
		options = {
			target: options
		}
	}
	proxyArr.push(proxyMiddleware(context, options));
});

gulp.task('browser-sync', ['sass', 'script','copy-resources','copy-html'], function(){
	browserSync.init({
		server: {
			middleware: proxyArr
		},
    startPath: '/dist/?debug=true', // 打开的位置
	});
	//监听文件的变化
	gulp.watch("css/**/*.scss", ['sass']);
	gulp.watch("js/**/*.js", ['script']);
	// gulp.watch("js/**/*.js", ['jsmin']);
	gulp.watch("resources/**/*", ['copy-resources']);
  gulp.watch("index.html", ['copy-html']);
});


gulp.task('copy-resources',function(){
  return gulp.src('resources/**/*')
  // .pipe(assetRev())
  .pipe(gulp.dest('dist/resources/'))
  .pipe(browserSync.stream());;
})
gulp.task('copy-html',function(){
  return gulp.src('index.html')
  // .pipe(assetRev())
  .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());;
})
//编译sass
gulp.task('sass', function(){
	return gulp.src('css/main.scss')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});
//监听js
gulp.task('script', function(){
	return gulp.src('./js/**/*.js')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(sourcemaps.init())
		.pipe(webpack({
			devtool: "source-map",
			entry: {
				app: './js/index.js'
			},
			output: {
				filename: 'main.js'
			},
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'babel-loader'
					}
				]
			},
			plugins: []
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/js/'))
});
// 压缩js
gulp.task('jsmin', ['script'], function() {
	return gulp.src('./dist/js/*.js')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'))
		.pipe(browserSync.stream());
});
gulp.task('default', ['browser-sync']);
