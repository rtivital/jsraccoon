'use strict';

var execSync = require('sync-exec');
var Promise = require('bluebird');
var checkstyle = require('./checkstyle');
var dargs = require('dargs');
var child_process = require('child_process');

var scssLintCodes = {
  '64': 'Command line usage error',
  '66': 'Input file did not exist or was not readable',
  '69': 'You need to have the scss_lint_reporter_checkstyle gem installed',
  '70': 'Internal software error',
  '78': 'Configuration error',
  '127': 'You need to have Ruby and scss-lint gem installed'
};

function generateCommand(filePaths, options) {
  var commandParts = ['scss-lint'],
      excludes = ['bundleExec',
                  'filePipeOutput',
                  'reporterOutput',
                  'endlessReporter',
                  'src',
                  'shell',
                  'reporterOutputFormat',
                  'customReport',
                  'maxBuffer',
                  'endless',
                  'verbose',
                  'sync'];

  if (options.bundleExec) {
    commandParts.unshift('bundle', 'exec');
    excludes.push('bundleExec');
  }

  var optionsArgs = dargs(options, excludes);

  return commandParts.concat(filePaths, optionsArgs).join(' ');
}

function execCommand(command, options) {
  return new Promise(function(resolve, reject) {
    var commandOptions = {
      env: process.env,
      cwd: process.cwd(),
      maxBuffer: options.maxBuffer || 300 * 1024,
      shell: options.shell
    };

    if (options.sync || options.endless) {
      var commandResult = execSync(command);
      var error = null;

      if (commandResult.status) {
        error = {code: commandResult.status};
      }

      resolve({error: error, report: commandResult.stdout});
    } else {
      child_process.exec(command, commandOptions, function(error, report) {
        resolve({error: error, report: report});
      });
    }
  });
}

function configFileReadError(report, options) {
  return report.indexOf('No such file or directory - ' + options.config) !== -1;
}

function execLintCommand(command, options) {
  return new Promise(function(resolve, reject) {
    execCommand(command, options).then(function(result) {
      var error = result.error;
      var report = result.report;

      if (error && error.code !== 1 && error.code !== 2 && error.code !== 65) {
        if (scssLintCodes[error.code]) {
          if (error.code === 66 && configFileReadError(report, options)) {
            reject('Config file did not exist or was not readable');
          } else {
            reject(scssLintCodes[error.code]);
          }
        } else if (error.code) {
          reject('Error code ' + error.code + '\n' + error);
        } else {
          reject(error);
        }
      } else if (error && error.code === 1 && report.length === 0) {
        reject('Error code ' + error.code + '\n' + error);
      } else  {
        if (options.format === 'JSON'){
          resolve([JSON.parse(report)]);
        } else {
          checkstyle.toJSON(report, resolve);
        }
      }
    });
  });
}

module.exports = function(filePaths, options) {
  var command = generateCommand(filePaths, options);

  if (options.verbose) {
    console.log(command);
  }

  return execLintCommand(command, options);
};
