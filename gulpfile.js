// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var haml = require('gulp-haml');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/images/**/*',
      imgDst = './build/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// parse sass
gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

// parse haml
gulp.task('haml:includes', function() {
    return gulp.src('./haml_includes/*.haml')
        .pipe(haml())
        .pipe(gulp.dest('./_includes'));
});
gulp.task('haml:layouts', function() {
    return gulp.src('./haml_layouts/*.haml')
        .pipe(haml())
        .pipe(gulp.dest('./_layouts'));
});
gulp.task('haml', function() {
    gulp.run('haml:includes', 'haml:layouts');
})

// default
gulp.task('default', ['haml', 'sass', 'jshint', 'imagemin'], function() {
    // watch HAML
    gulp.watch('./haml_includes/*.haml', function() {
        gulp.run('haml:includes');
    });
    gulp.watch('./haml_layouts/*.haml', function() {
        gulp.run('haml:layouts');
    });

    // watch JS
    gulp.watch('./js/**/*.js', function() {
        gulp.run('jshint');
    });

    // watch SASS
    gulp.watch('./sass/**/*.scss', function() {
        gulp.run('sass');
    })
})