var gulp       = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglify'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
    spritesmith = require('gulp.spritesmith');//Подключаем библиотеку для объединения иконок в спрайты


/*Конвертируем sass в css*/
gulp.task('sass', function(){ 
    return gulp.src('assets/sass/**/*.sass') 
        .pipe(sass()) 
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
        .pipe(gulp.dest('assets/css')) 
        .pipe(browserSync.reload({stream: true})) 
});

/*Переносим библиотеки из bower в app*/
gulp.task('scripts', function() {
    return gulp.src([ 
        'bower_components/jquery/dist/jquery.min.js', 
        'bower_components/owl.carousel/dist/owl.carousel.min.js', 
        ])
        .pipe(gulp.dest('app/js')); 
});

/*Создаем сервер с livereload*/
gulp.task('browser-sync', function() { 
    browserSync.init({
        proxy   : "http://localhost/"
    });
});

/*Смотрим изменение файлов php,sass,js*/
gulp.task('watch', ['browser-sync' , 'scripts'], function() {
    gulp.watch('assets/sass/**/*.sass', ['sass']); 
    gulp.watch('app/js/**/*.js', browserSync.reload);   
    gulp.watch('./**/*.php').on('change', browserSync.reload);
});
