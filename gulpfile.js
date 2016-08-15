var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    compass     = require('gulp-compass'),
    concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    util        = require('gulp-util'),
    del         = require('del'),
    browserSync = require('browser-sync').create(),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    vueify      = require('vueify');

var onError = function (err) {
  util.beep();
  console.log(err);
};

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('set-dev', function() {
  return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod', function() {
  return process.env.NODE_ENV = 'production';
});

gulp.task('build', ['set-prod', 'styles', 'browserify', 'copy-fonts', 'bootstrap'], function() {
  del(['./dist/css/*']);
  del(['./dist/js/*']);
  del(['./dist/fonts/*']);
  del(['./dist/images/*']);

  gulp.src(['./app/css/**'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/css'))

  gulp.src(['./app/js/**'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/js'))

  gulp.src(['./app/fonts/**'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/fonts'))

  gulp.src(['./app/images/**'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/images'))

  gulp.src(['./app/.htaccess'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist'))

  gulp.src(['./app/index.html'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', ['set-dev', 'styles', 'browserify', 'copy-fonts', 'bootstrap'], function () {
  gulp.watch([
    'app/styles/**/*.scss'
  ], ['styles']);

  gulp.watch([
    'app/scripts/**/*.js',
    'app/scripts/**/*.vue',
  ], ['browserify']);

  gulp.watch([
    'app/index.html'
  ]).on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    open: 'external',
    host: 'front.cardumen.localhost',
    proxy: 'front.cardumen.localhost',
    port: 8080
  });
});

gulp.task('styles', function() {
  gulp.src(['./app/styles/**/*.scss'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest('./temp/styles'))
    .pipe(compass({
      css: './app/css',
      sass: './temp/styles'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream())
});

gulp.task('browserify', function(){
  browserify({
        entries: ['./app/scripts/initialize.js'],
        paths: ['./node_modules','./app/scripts/']
    })
    .transform(vueify)
    .bundle()
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./app/js'));
});

/*** Static files ***/

gulp.task('bootstrap', function() {
  gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css.map'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./app/css'))
});

gulp.task('copy-fonts', function () {
  gulp.src('node_modules/bootstrap/dist/fonts/**')
    .pipe(gulp.dest('./app/fonts'));
});

/*** Static files ***/
