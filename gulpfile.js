const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');

gulp.task('build:css', () => {
  return gulp.src('./styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(gulp.dest('./css'))
		.pipe(minifyCss())
    .pipe(sourcemaps.write())
		.pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', () => gulp.watch('./styles/**/*.scss', ['build:css']));
gulp.task('default', ['build:css'])
