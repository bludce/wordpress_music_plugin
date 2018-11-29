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
    spritesmith  = require('gulp.spritesmith');//Подключаем библиотеку для объединения иконок в спрайты


/*Создаем спрайты*/
gulp.task('sprite', function () {
  var spriteData = gulp.src('assets/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.sass'
    
  }));
    spriteData.img.pipe(gulp.dest('assets/img/')); 
    spriteData.css.pipe(gulp.dest('assets/sass/')); 
});

/*Конвертируем sass в css*/
gulp.task('sass', function(){ 
    return gulp.src('assets/sass/*.sass') 
        .pipe(sass()) 
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
        .pipe(gulp.dest('assets/css')) 
        .pipe(browserSync.reload({stream: true})) 
});


/*Создаем сервер с livereload*/
gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false 
    });
});

/*Смотрим изменение файлов html,sass,js*/
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('assets/sass/**/*.sass', ['sass']); 
    gulp.watch('assets/*.php', browserSync.reload);
    gulp.watch('assets/js/**/*.js', browserSync.reload);   
});


/*=========Таски сборки в продакшн===========*/

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('clean', function() {
    return del.sync('build'); 
});

gulp.task('script:build', function() {
    return gulp.src('assets/js/*')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('prod/assets/js'))
});

gulp.task('img:build', function() {
    return gulp.src('assets/img/*') 
        .pipe(cache(imagemin({ 
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))/**/)
        .pipe(gulp.dest('prod/assets/img')); 
});

gulp.task('css:build', function() {
    return gulp.src('assets/css/*.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('prod/assets/css'))
});

gulp.task('php:build' ,function() {
    return gulp.src('assets/*.php')
        .pipe(gulp.dest('build'))
});


gulp.task('build', ['clear','clean', 'img:build', 'script:build', 'css:build', 'php:build', ], function() {
    var htaccess = gulp.src('assets/*.php') // Переносим HTML в продакшен
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['watch']);