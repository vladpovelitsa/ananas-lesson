/* 
	packeges
	
	npm i gulp -g --save-dev
	npm i gulp-sass --save-dev
	npm i gulp-rename --save-dev
	npm i gulp-autoprefixer --save-dev 
	npm i gulp-sourcemaps --save-dev
	npm i gulp-rigger --save-dev


npm i --save-dev gulp-sass gulp-rename gulp-autoprefixer gulp-sourcemaps gulp-ripper browser-syn
*/ 

var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    rigger = require('gulp-rigger');

gulp.task('sass', function(done) {
    gulp.src("app/scss/**/*.scss")
    	.pipe(sourcemaps.init())
        .pipe(rename({suffix: '.min'}))
        .pipe(sass({
        	errorLogToConsole: true,
        	outputStyle: 'compressed',
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
        	cascade: false,
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("app/css/"))
        .pipe(browserSync.stream());

    done();
});

gulp.task('scripts', function(done){

    gulp.src(['app/libs/jquery/dist/jquery.min.js', 'app/libs/slick-carousel/slick/slick.min.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js/'))
    done()
})

gulp.task('serve', function(done) {

    browserSync.init({
        server: "app/"
    });

    gulp.watch("app/scss/*.scss", gulp.series('sass'));
    gulp.watch(["app/**/*.html","app/**/*.js","app/**/*.php"]).on('change', () => {
      // pagebuilder()
      browserSync.reload();

      done();
    });

  
    done();
});


gulp.task('html', function(done){
    gulp.src('app/*.html')
    .pipe(rigger())
    .pipe(gulp.dest('build/'))

    done()
})

gulp.task('default', gulp.series('sass','html', 'serve'));	