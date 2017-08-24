const gulp = require('gulp')
const $    = require('gulp-load-plugins')()
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const pug = require('gulp-pug')

// Static Server + watching scss/html files
gulp.task('serve', ['pug-compile', 'sass', 'concat-js'], function () {
  browserSync.init({
    server: './dist'
  })

  gulp.watch('src/views/*.html', ['browser-reload'])
  gulp.watch('src/views/*.pug', ['browser-reload'])
  gulp.watch('src/sass/*.scss', ['browser-reload'])
  gulp.watch('src/js/*.js', ['browser-reload'])
})

gulp.task('browser-reload', ['pug-compile', 'sass', 'concat-js'], function () {
  browserSync.stream()
})

//  將不同的 js 檔案合併在同一支當中
gulp.task('concat-js', function () {
  return gulp.src([
    'vendor/jquery-3.1.1.js',
    'vendor/tether.min.js',
    'vendor/bootstrap.min.js',
    'vendor/lodash.min.js',
    'src/js/*.js'
  ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist'))
})

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe($.autoprefixer({
          browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('./dist'))
})

//  clean-css
gulp.task('clean-css', ['sass'], function () {
  return gulp.src(['./vendor/*.css', './dist/*.css'])
        .pipe(cleanCSS())
        .pipe(concat('main.css'), {newLine: ''})
        .pipe(gulp.dest('./dist'))
})

//  將 pug 轉成 HTML
gulp.task('pug-compile', function () {
  return gulp.src('src/views/*.pug')
        .pipe(pug({
          // Your options in here.
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
})

//  Move HTML to dist folder
// gulp.task('move-html', function () {
//   return gulp.src('src/views/*.html')
//         .pipe(gulp.dest('./dist'))
//         .pipe(browserSync.stream())
// })

gulp.task('default', ['serve'])
