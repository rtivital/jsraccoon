'use strict';

var es = require('event-stream'),
gutil = require('gulp-util'),
colors = gutil.colors;

exports.failReporter = function (severity) {
  return es.map(function(file, cb) {
    var error;

    if (!file.scsslint.success) {
      if (!severity || severity === 'E' && file.scsslint.errors > 0) {
        error = new gutil.PluginError('gulp-scss-lint', {
          message: 'ScssLint failed for: ' + file.relative,
          showStack: false
        });
      }
    }

    cb(error, file);
  });
};

exports.defaultReporter = function (file) {
  if (!file.scsslint.success) {
    gutil.log(colors.cyan(file.scsslint.issues.length) + ' issues found in ' + colors.magenta(file.path));

    file.scsslint.issues.forEach(function (issue) {
      var severity = issue.severity === 'warning' ? colors.yellow(' [W] ') : colors.red(' [E] ');
      var linter = issue.linter ? (issue.linter + ': ') : '';
      var logMsg =
        colors.cyan(file.relative) + ':' + colors.magenta(issue.line) + severity + colors.green(linter) + issue.reason;

      gutil.log(logMsg);
    });
  }
}
