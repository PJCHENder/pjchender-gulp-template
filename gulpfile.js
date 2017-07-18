const gulp = require('gulp')
const $    = require('gulp-load-plugins')()
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const pug = require('gulp-pug')
const inject = require('gulp-inject')

// inject link into html
gulp.task('inject-index', ['pug-compile', 'sass', 'concat-js'], function () {
  var target = gulp.src('./dist/index.html')
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./dist/*.js', './dist/*.css'], {read: false})

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

// Static Server + watching scss/html files
gulp.task('serve', ['inject-index'], function () {
  browserSync.init({
    server: './dist'
  })

  gulp.watch('src/views/*.pug', ['inject-index', 'browser-reload'])
  gulp.watch('src/sass/*.scss', ['inject-index', 'browser-reload'])
  gulp.watch('src/js/*.js', ['inject-index', 'browser-reload'])
  // gulp.watch('*.html').on('change', browserSync.reload)
})

gulp.task('browser-reload', ['inject-index'], function () {
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

gulp.task('default', ['inject-index', 'serve'])
gulp.task('dev', ['clean-css', 'inject-index', 'serve'])
