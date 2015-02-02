var gulp = require('gulp'),

    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserifyAnnotate = require('browserify-ngannotate'),
    uglifyify = require('uglifyify'),
    streamify = require('gulp-streamify'),

    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    argv = require('yargs').argv,
    templateCache = require('gulp-angular-templatecache'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var opt = {
    SASS_FOLDER: './app/sass/',
    SASS_SOURCE: './app/sass/**/*.scss',
    SASS_DIST: './dist/style/',


    JS_SOURCE: './app/scripts/**/*.js',
    JS_DIST: './dist/js/',

    VIEW_SOURCE: './app/scripts/views/**/*.html',
    VIEW_DIST: './app/scripts/views/',

    TEMPLATE_SOURCE: './app/scripts/directives/templates/**/*.html',
    TEMPLATE_DIST: './app/scripts/directives/templates/',

    MAIN_JS_SOURCE: './app/scripts/main.js',

    IMAGES_SOURCE: './dist/images/*',
    IMAGES_DIST: './dist/images/',
    IMAGES_PROJECTS: './dist/images/projects/**/*',
    IMAGES_PROJECTS_OPTIM: './dist/images/projects-optim/',

    ROOT_DIST: './dist/',

    MODULE_NAME: 'app'
};

gulp.task('browserify', function () {

    var browserified = transform(function (filename) {
        var b = browserify(filename);
        b.transform(browserifyAnnotate)

        return b.bundle();
    });

    gulp.src(opt.MAIN_JS_SOURCE)
        .pipe(browserified)
        //.pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
    return gulp.src(opt.SASS_FOLDER + 'main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        //.pipe(concat('main.css'))
        .pipe(gulp.dest(opt.SASS_DIST));
});

gulp.task('init', function () {
    // move foundation
    gulp.src('./bower_components/foundation/scss/**/*.scss', {base: './bower_components/foundation/scss'})
        .pipe(gulp.dest(opt.SASS_FOLDER));

    // move slick
    gulp.src('./node_modules/slick-carousel/slick/slick.scss')
        .pipe(gulp.dest(opt.SASS_FOLDER));
    gulp.src('./node_modules/slick-carousel/slick/fonts/*', {base: './node_modules/slick-carousel/slick/'})
        .pipe(gulp.dest(opt.SASS_DIST));

    // move animate
    gulp.src('./bower_components/animate.css/animate.css')
        .pipe(gulp.dest(opt.SASS_DIST));
})

gulp.task('templateCache', function () {
    gulp.src(opt.VIEW_SOURCE)
        .pipe(templateCache({
            // set the module name for the template file
            module: opt.MODULE_NAME,
            root: 'views'
        }))
        .pipe(gulp.dest(opt.VIEW_DIST));

    gulp.src(opt.TEMPLATE_SOURCE)
        .pipe(templateCache({
            module: opt.MODULE_NAME,
            root: 'templates'
        }))
        .pipe(gulp.dest(opt.TEMPLATE_DIST));
});

gulp.task('imageopt', function () {
    gulp.src(opt.IMAGES_PROJECTS)
        .pipe(imagemin())
        .pipe(gulp.dest(opt.IMAGES_PROJECTS_OPTIM));
});

gulp.task('lint', function () {
    return gulp.src(opt.JS_SOURCE)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', function () {
    gulp.watch([opt.VIEW_SOURCE, opt.TEMPLATE_SOURCE], ['templateCache']);
    gulp.watch(opt.JS_SOURCE, ['browserify']);
    gulp.watch(opt.SASS_SOURCE, ['sass']);

});