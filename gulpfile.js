const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const rigger = require('gulp-rigger');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const jpeg2000 = require('gulp-jpeg-2000');

const startSass = () => {
 return gulp
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
};

exports.startSass = startSass;

const scripts = () => {
 return gulp
  .src([
   'app/libs/jquery/dist/jquery.min.js',
   'app/libs/slick-carousel/slick/slick.min.js',
   'app/libs/lightbox/dist/js/lightbox.min.js',
   'app/libs/jquery.maskedinput.js',
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js/'));
};

exports.scripts = scripts;

const styles = () => {
 return gulp
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
};
exports.styles = styles;

const serve = () => {
 browserSync.init({
  server: 'build/',
  startPath: 'sitemap.html',
 });

 gulp.watch('app/sass/*.scss', gulp.series('startSass'));
 gulp.watch(
  ['app/**/*.html', 'app/**/*.js', 'app/**/*.php'],
  gulp.series('html', 'buildJs', 'reload')
 );
};
exports.serve = serve;

const html = () => {
 return gulp.src('app/*.html').pipe(rigger()).pipe(gulp.dest('build/'));
};

exports.html = html;

const reload = () => {
 return browserSync.reload();
};
exports.reload = reload;

const startImagemin = () => {
 return gulp
  .src('app/img/**/*.{jpg,jpeg,png,svg,gif}')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img/'));
};
exports.startImagemin = startImagemin;

const buildCss = () => {
 return gulp.src('app/css/**/*.css').pipe(gulp.dest('build/css/'));
};
exports.buildCss = buildCss;

const buildJs = () => {
 return gulp.src('app/js/**/*.js').pipe(gulp.dest('build/js/'));
};

exports.buildJs = buildJs;

const buildFonts = () => {
 return gulp.src('app/fonts/**/*').pipe(gulp.dest('build/fonts/'));
};

exports.buildFonts = buildFonts;

const build = () => {
 return gulp.series(
  'startImagemin',
  'html',
  'buildCss',
  'buildJs',
  'buildFonts'
 );
};
exports.build = build;

exports.default = gulp.series(startSass, html, scripts, styles, serve);
