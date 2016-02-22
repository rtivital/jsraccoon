#gulp-scss-lint
[![Build Status](https://travis-ci.org/juanfran/gulp-scss-lint.svg?branch=master)](https://travis-ci.org/juanfran/gulp-scss-lint)
> Lint your `.scss` files

## Install

```shell
npm install gulp-scss-lint --save-dev
```

This plugin requires Ruby and [scss-lint](https://github.com/causes/scss-lint)
```shell
gem install scss_lint
```

## Usage

`gulpfile.js`
```js
var scsslint = require('gulp-scss-lint');

gulp.task('scss-lint', function() {
  return gulp.src('/scss/*.scss')
    .pipe(scsslint());
});
```

## Api

#### config

- Type: `String`
- Default: [default scss-lint config file](https://github.com/causes/scss-lint/blob/master/config/default.yml).

```js
scsslint({
    'config': 'lint.yml',
});
```

#### bundleExec

- Type: `Boolean`
- Default: `false`

If your gem is installed via [bundler](http://bundler.io), then set this option to `true`

```js
scsslint({
    'bundleExec': true
});
```

#### reporterOutput

- Type: `String`
- Default: `null`

If you want to save the report to a file then set reporterOutput with a file name

```js
scsslint({
    'reporterOutput': 'scssReport.json'
});
```

#### reporterOutputFormat

- Type: `String`
- Default: `JSON`
- Values: `JSON` or `Checkstyle`

```js
gulp.src(['**/*.scss'])
  .pipe(scsslint({
    'reporterOutputFormat': 'Checkstyle',
  }))
```

#### filePipeOutput

- Type: `String`
- Default: `null`

If you want the pipe return a report file instead of the `.scss` file then set filePipeOutput with a filename

```js
//xml
gulp.src(['**/*.scss'])
  .pipe(scsslint({
    'reporterOutputFormat': 'Checkstyle',
    'filePipeOutput': 'scssReport.xml'
  }))
  .pipe(gulp.dest('./reports'))

//json
gulp.src(['**/*.scss'])
  .pipe(scsslint({
    'filePipeOutput': 'scssReport.json'
  }))
  .pipe(gulp.dest('./reports'))
```

#### maxBuffer
- Type: Number or Boolean
- Default: 300 * 1024

Set maxBuffer for the child_process.exec process. If you get a `maxBuffer exceeded` error, set it with a higher number. maxBuffer specifies the largest amount of data allowed on stdout or stderr.

```js
gulp.src(['**/*.scss'])
  .pipe(scsslint({
    'maxBuffer': 307200
  }))
  .pipe(gulp.dest('./reports'))
```

#### endless

- Type: Boolean
- Default: false

If you use gulp-watch set endless to true.

#### sync

- Type: Boolean
- Default: sync

`scss-lint` will be executed in sequence.

#### verbose

- Type: Boolean
- Default: false

If you want to see the executed scss-lint command for debugging purposes, set this to true.

## Glob pattern without gulp.src
```js
var scsslint = require('gulp-scss-lint');

gulp.task('scss-lint', function() {
  return scsslint({
    shell: 'bash', // your shell must support glob
    src: '**/*.scss'
  });
});
```


## Excluding

To exclude files you should use the gulp.src ignore format '!filePath''

```js
gulp.src(['/scss/*.scss', '!/scss/vendor/**/*.scss'])
  .pipe(scsslint({'config': 'lint.yml'}));
```

Or you should use [gulp-filter](https://github.com/sindresorhus/gulp-filter)

```js
var scsslint = require('gulp-scss-lint');
var gulpFilter = require('gulp-filter');

gulp.task('scss-lint', function() {
  var scssFilter = gulpFilter('/scss/vendor/**/*.scss');

  return gulp.src('/scss/*.scss')
    .pipe(scssFilter)
    .pipe(scsslint())
    .pipe(scssFilter.restore());
});

```

## Lint only modified files
You should use [gulp-cached](https://github.com/wearefractal/gulp-cached)

In this example, without the gulp-cached plugin, every time you save a `.scss` file the scss-lint plugin will check all your files. In case you have gulp-cached plugin, it will only check the modified files.

```js
var scsslint = require('gulp-scss-lint');
var cache = require('gulp-cached');

gulp.task('scss-lint', function() {
  return gulp.src('/scss/*.scss')
    .pipe(cache('scsslint'))
    .pipe(scsslint());
});

gulp.task('watch', function() {
  gulp.watch('/scss/*.scss', ['scss-lint']);
});
```

## Results

Adds the following properties to the file object:

```js
file.scsslint = {
  'success': false,
  'errors': 0,
  'warnings': 1,
  'issues': [
    {
      'line': 123,
      'column': 10,
      'severity': 'warning', // or `error`
      'reason': 'a description of the error'
    }
  ]
};
```

The issues have the same parameters that [scss-lint](https://github.com/causes/scss-lint#xml)

## Custom reporter

You can replace the default console log by a custom output with `customReport`. customReport function will be called for each file that includes the lint results [See result params](#results)

```js
var scsslint = require('gulp-scss-lint');

var myCustomReporter = function(file) {
  if (!file.scsslint.success) {
    gutil.log(file.scsslint.issues.length + ' issues found in ' + file.path);
  }
};

gulp.task('scss-lint', function() {
  return gulp.src('/scss/*.scss')
    .pipe(scsslint({
        customReport: myCustomReporter
    }))
});
```

You can even throw an exception

```js
var scsslint = require('gulp-scss-lint');

var myCustomReporter = function(file, stream) {
  if (!file.scsslint.success) {
    stream.emit('error', new gutil.PluginError("scss-lint", "some error"));
  }
};

gulp.task('scss-lint', function() {
  return gulp.src('/scss/*.scss')
    .pipe(scsslint({
        customReport: myCustomReporter
    }))
});
```

## Default reporter

This is an example from the default reporter output

```shell
[20:55:10] 3 issues found in test/fixtures/invalid.scss
[20:55:10] test/fixtures/invalid.scss:1 [W] IdSelector: Avoid using id selectors
[20:55:10] test/fixtures/invalid.scss:2 [W] Indentation: Line should be indented 2 spaces, but was indented 0 spaces
[20:55:10] test/fixtures/invalid.scss:2 [W] EmptyRule: Empty rule
```

## Fail reporter

If you want the task to fail when "scss-lint" was not a success then call `failReporter` after the scsslint call.

This example will log the issues as usual and then fails if there is any issue.

```js
var scsslint = require('gulp-scss-lint');

gulp.task('scss-lint', function() {
  return gulp.src('/scss/*.scss')
    .pipe(scsslint())
    .pipe(scsslint.failReporter())
});
```

if you just want `failReporter` to fail just with errors pass the 'E' string

```js
var scsslint = require('gulp-scss-lint');

gulp.task('scss-lint', function() {
  return gulp.src('/scss/*.scss')
    .pipe(scsslint())
    .pipe(scsslint.failReporter('E'))
});
```

## Testing

To test you must first have `scss-lint` installed globally using
`gem install scss-lint` as well as via bundler using `bundle install`.
