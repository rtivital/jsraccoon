'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const scsslint = require('gulp-scss-lint');

const paths = {
	sass: {
			all: './styles/**/*.scss',
			lint: '/styles/vendor/**/*.scss',
			lintConfig: './scsslint.yml'
		},
	dist: {
		css: './css',
		js: './js'
	}
};

// paths.sass.exclude = paths.sass.exclude.map(path => `!${path}`);

gulp.task('lint:scss', () => {
	// const files = [...paths.sass.files, ...paths.sass.exclude];
	// console.log(files, paths.sass);
	const exclude = filter(['*', '!styles/modules'], {restore: true});
	return gulp.src(['./styles/vendor/**/*.scss'])
		// .pipe(exclude.restore)
		.pipe(scsslint({
  		config: './scsslint.yml'
  	}));

});

gulp.task('build:css', () => {
	// Filter for scss-lint: exclude all third-party libraries
	const exclude = filter(['styles/**/*.scss', '!modules/**/*.scss'], { restore: true });
  return gulp.src('./styles/**/*.scss')
  	.pipe(exclude)
  	.pipe(scsslint({
  		config: './scsslint.yml'
  	}))
  	.pipe(exclude.restore)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./css'))
		.pipe(minifyCss())
		.pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./styles/**/*.scss', ['build:css']);
});

gulp.task('default', ['build:css'])