var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    argv = require('yargs').argv,
    templateCache = require('gulp-angular-templatecache');


var opt = {
    SASS_SOURCE: './app/sass/**/*.scss',
    SASS_DIST: './dist/style',

    JS_SOURCE: './app/scripts/**/*.js',
    JS_DIST: './dist/js',

    TEMPLATE_SOURCE: './app/scripts/views/**/*.html',
    TEMPLATE_DIST: './app/scripts/views',

    MAIN_JS_SOURCE: './app/scripts/main.js',

    MODULE_NAME: 'app'
};

gulp.task('browserify', function () {
    var production = argv.production || false;

    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
    gulp.src(opt.MAIN_JS_SOURCE)
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        // Bundle to a single file
        .pipe(concat('bundle.js'))
        // Output it to our dist folder
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
    return gulp.src(opt.SASS_SOURCE)
        .pipe(sass())
        .pipe(gulp.dest(opt.SASS_DIST));
});

gulp.task('copy:foundation', function () {
    return gulp.src('bower_components/foundation/css/foundation.css')
        .pipe(gulp.dest(opt.SASS_DIST));
});

gulp.task('templateCache', function () {
    gulp.src(opt.TEMPLATE_SOURCE)
        .pipe(templateCache({
            module: opt.MODULE_NAME,
            root: 'views'
        }))
        .pipe(gulp.dest(opt.TEMPLATE_DIST));
});

gulp.task('default', function () {
    gulp.watch(opt.TEMPLATE_SOURCE, ['templateCache']);
    gulp.watch(opt.JS_SOURCE, ['browserify']);
    gulp.watch(opt.SASS_SOURCE, ['sass']);

})