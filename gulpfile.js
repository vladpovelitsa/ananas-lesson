var gulp = require('gulp'),
 browserSync = require('browser-sync').create(),
 sass = require('gulp-sass'),
 rename = require('gulp-rename'),
 autoprefixer = require('gulp-autoprefixer'),
 sourcemaps = require('gulp-sourcemaps'),
 concat = require('gulp-concat'),
 uglify = require('gulp-uglifyjs'),
 rigger = require('gulp-rigger'),
 webp = require('gulp-webp'),
 imagemin = require('gulp-imagemin'),
 jpeg2000 = require('gulp-jpeg-2000');

gulp.task('sass', function (done) {
 gulp
  .src('app/sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(rename({ suffix: '.min' }))
  .pipe(
   sass({
    errorLogToConsole: true,
    outputStyle: 'compressed',
   })
  )
  .on('error', console.error.bind(console))
  .pipe(
   autoprefixer({
    cascade: false,
   })
  )
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('app/css/'))
  .pipe(gulp.dest('build/css/'))

  .pipe(browserSync.stream());

 done();
});

gulp.task('scripts', function (done) {
 gulp
  .src([
   'app/libs/jquery/dist/jquery.min.js',
   'app/libs/slick-carousel/slick/slick.min.js',
   'app/libs/lightbox/dist/js/lightbox.min.js',
   'app/libs/jquery.maskedinput.js',
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js/'));
 done();
});

gulp.task('styles', function (done) {
 gulp
  .src([
   'app/libs/slick-carousel/slick/slick.scss',
   'app/libs/lightbox/dist/css/lightbox.min.css',
  ])
  .pipe(concat('libs.min.css'))
  .pipe(
   sass({
    errorLogToConsole: true,
    outputStyle: 'compressed',
   })
    .on('error', console.error.bind(console))
    .pipe(
     autoprefixer({
      cascade: false,
     })
    )
    .pipe(gulp.dest('app/css/'))
  );
 done();
});

gulp.task('serve', function (done) {
 browserSync.init({
  server: 'build/',
  startPath: 'sitemap.html',
 });

 gulp.watch('app/sass/*.scss', gulp.series('sass'));
 gulp.watch(
  ['app/**/*.html', 'app/**/*.js', 'app/**/*.php'],
  gulp.series('html', 'buildJs', 'reload')
 );

 done();
});

gulp.task('html', function (done) {
 gulp.src('app/*.html').pipe(rigger()).pipe(gulp.dest('build/'));

 done();
});

gulp.task('reload', function (done) {
 browserSync.reload();
 done();
});

gulp.task('convertJPEG2000', function (done) {
 gulp
  .src('app/img/**/*.{jpg,jpeg,png}')
  .pipe(jpeg2000())
  .pipe(gulp.dest('app/img/'));

 done();
});

gulp.task('convertWEBP', function (done) {
 gulp.src('app/img/*.{jpg,jpeg,png}').pipe(webp()).pipe(gulp.dest('app/img/'));

 done();
});

gulp.task('imagemin', function (done) {
 gulp
  .src('app/img/**/*.{jpg,jpeg,png,svg,gif}')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img/'));

 done();
});
gulp.task('buildCss', function (done) {
 gulp.src('app/css/**/*.css').pipe(gulp.dest('build/css/'));
 done();
});
gulp.task('buildJs', function (done) {
 gulp.src('app/js/**/*.js').pipe(gulp.dest('build/js/'));
 done();
});
gulp.task('buildFonts', function (done) {
 gulp.src('app/fonts/**/*').pipe(gulp.dest('build/fonts/'));
 done();
});

gulp.task(
 'build',
 gulp.series('imagemin', 'html', 'buildCss', 'buildJs', 'buildFonts')
);

gulp.task('default', gulp.series('sass', 'html', 'scripts', 'styles', 'serve'));
