var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });

    watch('./app/index.html', () => {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', () => {
        gulp.start('styles');
    });

    watch('./app/temp/styles/styles.css', () => {
        browserSync.reload();    
    });

    watch('./app/assets/scripts/**/*.js', () => {
        gulp.start('scripts');
    });

    watch('./app/temp/scripts/App.js', () => {
        browserSync.reload();    
    });
});