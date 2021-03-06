var gulp = require('gulp');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var refresh = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var notify = require('node-notifier');
var lr = require('tiny-lr');
var lrserver = lr();

function handleError(err) {
  notify(err.toString());
  this.emit('end');
}

gulp.task('sass', function(){
  gulp.src('./app/assets/sass/styles.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: './public/css',
      sass: './app/assets/sass'
    }))
    .pipe(prefix())
    .pipe(gulp.dest('./public/css'))
    .on('error', function() {
      handleError(err);
    });
});

gulp.task('img', function () {
  gulp.src('./app/assets/img/**/*')
    .pipe(gulp.dest('./public/img/'));
});

gulp.task('js', function () {
  gulp.src('./app/assets/js/**/*.js')
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('data', function() {
  gulp.src('./app/assets/data/**/*.json')
    .pipe(gulp.dest('./public/data'));
});

gulp.task('copy', function () {
  // Copy bower components into public/js/libs
  gulp.src([
    './node_modules/lodash/dist/lodash.js',
    './bower_components/jquery/dist/jquery.js',
    './bower_components/foundation/js/foundation.js',
    './bower_components/foundation/js/foundation/foundation.topbar.js',
    './bower_components/foundation/js/vendor/modernizr.js',
    './bower_components/Calendario/js/jquery.calendario.js',
    './bower_components/Calendario/js/modernizr.custom.63321.js',
    './bower_components/jquery-ui/ui/datepicker.js'
  ]).pipe(uglify())
    .pipe(gulp.dest('./public/js/libs'));

  // Copy fonts into public/fonts
  gulp.src('./app/assets/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('./app/assets/sass/**/*.scss', ['sass']);
  gulp.watch('./app/assets/img/**/*', ['img']);
  gulp.watch('./app/assets/js/**/*.js', ['js']);
  gulp.watch('./public/**/*').on('change', function(file) {
    refresh.changed(file.path);
  });
});

gulp.task('serve', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['assets/**/*.js', 'public']
  }).on('restart', function () {
      console.log('restarted! ' + (new Date()));
    });

  lrserver.listen();
});

gulp.task('build', ['sass', 'img', 'js', 'data', 'copy']);

gulp.task('default', ['build', 'serve', 'watch']);