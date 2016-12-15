var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
gulp.task("jade", function() {
    // input files for jade
    return gulp.src('_assets/_jadefiles/*.jade')
        // Run JADE on those Files
        .pipe(jade())
        // Write the resulting html in the output folder
        .pipe(gulp.dest('_site'))
        .pipe(browserSync.reload({
            stream: true
        }))
})
gulp.task('sass', function() {
    return gulp
        // input files for sass
        .src('_assets/_sass/main.sass')
        // Run Sass on those files
        .pipe(sass({
            includePaths: ['sass']
        }).on('error', sass.logError))
        // auto-prefixer for sass
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest('_site/assets/css'))
        // inject css without reloading the page
        .pipe(browserSync.reload({
            stream: true
        }))
});
//for copying js to _site/js folder
gulp.task('js', function() {
    // input files for js
    return gulp.src('_assets/_javascripts/*.js')
        // Write the resulting js in the output folder
        .pipe(gulp.dest('_site/assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
//for copying images to _site/img folder
gulp.task('img', function() {
    // input files for img
    return gulp.src('_assets/_image/**')
        // Write the resulting img in the output folder
        .pipe(gulp.dest('_site/assets/img'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
//start server with browser sync in _site directory
gulp.task('browser-sync', ['jade', 'sass', 'js', 'img'], function(done) {
    browserSync({
        server: {
            baseDir: '_site/',
        },
    });
});
gulp.task('watch', function() {
    // Watch the input folder for change,
    // and run according tasks when something happens
    gulp.watch(['_assets/_sass/**/*.sass'], ['sass']);
    gulp.watch(['_assets/_jadefiles/*.jade'], ['jade']);
    gulp.watch(['_assets/_javascripts/**'], ['js']);
    gulp.watch(['_assets/_image/**'], ['img']);
});
// default gulp task
gulp.task('default', ['browser-sync', 'watch']);