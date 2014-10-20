var gulp = require('gulp'),
    react = require('gulp-react'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),

    reactify = require('reactify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),

    gutil = require('gulp-util');


var opt = {
    JSX_SOURCE: 'assets/jsx/*.js',

    SASS_SOURCE: 'assets/sass/*.scss',

    JS_SOURCE: 'assets/js/*.js',
    JS_DEST: 'assets/js',

    CSS_SOURCE: 'assets/css/*.css',
    CSS_DEST: 'assets/css',

    BUILD: 'build',
    BUILD_JS: 'app.js',
    BUILD_CSS: 'style.css'
};

gulp.task('jsx', function () {
    return gulp.src(opt.JSX_SOURCE)
        .pipe(react())
        .pipe(gulp.dest(opt.JS_DEST));
});

gulp.task('sass', function () {
    return gulp.src(opt.SASS_SOURCE)
        .pipe(sass())
        .pipe(gulp.dest(opt.CSS_DEST));
});

gulp.task('build', function () {
    gulp.src(opt.JS_SOURCE)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(uglify())
        .pipe(concat(opt.BUILD_JS))
        .pipe(gulp.dest(opt.BUILD));

});

gulp.task('lint', function () {
    gulp.src(opt.JS_SOURCE)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));

});

gulp.task('default', function () {
    gulp.watch(opt.JSX_SOURCE, ['jsx']);
    gulp.watch(opt.SASS_SOURCE, ['sass']);
});