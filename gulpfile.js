var gulp        = require('gulp'),
    sass        = require('gulp-sass'),    
    browserSync = require('browser-sync').create();

    gulp.task('sass', function() {
        return gulp.src('./sass/**/*.scss')
                .pipe(sass({
                    'outputStyle' : 'compressed'
                }))
                .pipe(gulp.dest('./'))
                .pipe(browserSync.stream());
    });

    gulp.task('serve', ['sass'], function(){
        browserSync.init({
            proxy   : "http://localhost/"
        });
        
        gulp.watch('./sass/**/*.scss', ['sass']);
        gulp.watch('./**/*.php').on('change', browserSync.reload);
    });

    gulp.task('default', ['serve']);