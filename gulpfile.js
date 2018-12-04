var gulp       = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglify'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


/*Конвертируем sass в css*/
gulp.task('sass', function(){ 
    return gulp.src('assets/sass/**/*.sass') 
        .pipe(sass()) 
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
        .pipe(gulp.dest('assets/css')) 
        .pipe(browserSync.reload({stream: true})) 
});

/*Создаем сервер с livereload*/
gulp.task('browser-sync', function() { 
    browserSync.init({
        proxy   : "http://localhost/"
    });
});

/*Смотрим изменение файлов php,sass,js*/
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('assets/sass/**/*.sass', ['sass']); 
    gulp.watch('assets/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('./**/*.php').on('change', browserSync.reload);
});
