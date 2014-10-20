var gulp = require('gulp'),
    react = require('gulp-react'),
    sass = require('gulp-sass');


var opt = {
    JSX_SOURCE: 'assets/jsx/*.jsx',

    SASS_SOURCE: 'assets/sass/*.scss',

    JS_SOURCE: 'assets/js/*.js',
    JS_DEST: 'assets/js',

    CSS_SOURCE: 'assets/css/*.css',
    CSS_DEST: 'assets/css',

    BUILD: 'dist'
};

gulp.task('jsx', function () {
    return gulp.src(opt.JSX_SOURCE)
        .pipe(react())
        .pipe(gulp.dest(opt.JS_DEST));
});

gulp.task('sass', function(){
    return gulp.src(opt.SASS_SOURCE)
        .pipe(sass())
        .pipe(gulp.dest(opt.CSS_DEST));
});

gulp.task('default', function () {
    gulp.watch(opt.JSX_SOURCE, ['jsx']);
    gulp.watch(opt.SASS_SOURCE, ['sass']);
});

