'use strict';

var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var shellescape = require('shell-escape');
var vinylFs = require('vinyl-fs');
var es = require('event-stream');
var slash = require('slash');

var lintCommand = require('./command');
var reporters = require('./reporters');

function getRelativePath(filePath) {
  return slash(path.relative(process.cwd(), filePath));
}

function getFilePaths(files) {
  return files.map(function (file) {
    return shellescape([getRelativePath(file.path)]);
  });
}

function defaultLintResult() {
  return {
    success: true,
    errors: 0,
    warnings: 0,
    issues: []
  };
}

function reportLint(stream, files, options, lintReport, xmlReport) {
  var report = {};

  // normalize scss-lint urls
  Object.keys(lintReport).forEach(function(key) {
    var newKey = slash(key);
    report[newKey] = lintReport[key];
  });

  if (options.reporterOutput || options.endlessReporter) {
    var output = null;
    var reporterOutput = null;

    if (xmlReport) {
      output = xmlReport;
    } else {
      output = JSON.stringify(report);
    }

    if (options.reporterOutput) {
      reporterOutput = options.reporterOutput || '';
    } else if(options.endlessReporter) {
      reporterOutput = '';

      if (typeof options.endlessReporter === 'string' || options.endlessReporter instanceof String) {
        reporterOutput = options.endlessReporter;
      }

      reporterOutput = path.join(reporterOutput, 'report-' + path.basename(files[0].path));

      if (xmlReport) reporterOutput += '.xml';
      else reporterOutput += '.json';
    }

    fs.writeFileSync(reporterOutput, output);
  }

  var fileReport;
  var lintResult = {};

  for (var i = 0; i < files.length; i++) {
    lintResult = defaultLintResult();

    //relative or absolute path
    fileReport = report[slash(files[i].path)];

    if (!fileReport) {
      fileReport = report[getRelativePath(files[i].path)];
    }

    if (fileReport) {
      lintResult.success = false;

      fileReport.forEach(function (issue) {
        var severity = issue.severity === 'warning' ? 'W' : 'E';

        if (severity === 'W') {
          lintResult.warnings++;
        } else {
          lintResult.errors++;
        }

        lintResult.issues.push(issue);
      });
    }

    files[i].scsslint = lintResult;

    if (options.customReport) {
      options.customReport(files[i], stream);
    } else {
      reporters.defaultReporter(files[i]);
    }

    if (!options.filePipeOutput) {
      if (options.src) {
        stream.push(files[i]);
      } else {
        stream.emit('data', files[i]);
      }
    }
  }

  //TODO: endless support
  if (options.filePipeOutput) {
    var contentFile = "";

    if (xmlReport) {
      contentFile = xmlReport;
    } else {
      contentFile = JSON.stringify(report);
    }

    var pipeFile = new gutil.File({
      cwd: files[0].cwd,
      base: files[0].base,
      path: path.join(files[0].base, options.filePipeOutput),
      contents: new Buffer(contentFile)
    });

    pipeFile.scsslint = lintResult;

    if (options.src) {
      stream.push(files[i]);
    } else {
      stream.emit('data', pipeFile);
    }
  }
}

function getVinylFiles(paths) {
  return new Promise(function(resolve, reject){
    var files = [];

    var stream = es.through(function(currentFile) {
      files.push(currentFile);
    }, function() {
      resolve(files);
    });

    vinylFs.src(paths).pipe(stream);
  });
}

module.exports = function(stream, files, options) {
  return new Promise(function(resolve, reject){
    var filesPaths = [];

    if (options.src) {
      filesPaths = options.src;
    } else {
      filesPaths = getFilePaths(files);
    }

    lintCommand(filesPaths, options)
      .spread(function(report, xmlReport) {
        if (options.src) {
          var paths = Object.keys(report);

          getVinylFiles(paths).then(function(vinylFiles) {
            reportLint(stream, vinylFiles, options, report, xmlReport);
            resolve();
          });
        } else {
          try {
            reportLint(stream, files, options, report, xmlReport);
          } catch(err) {
            // if the user run scss-lint from node instead of gulp, stream.emit('data', null); becomes syncronous and this will handle the failReporter #58
            reject(err);
          }

          resolve();
        }
      }, function(e) {
        reject(e);
      });
  });
};
