'use strict';

var pd = require('pretty-data').pd,
    xml2js = require('xml2js').parseString;

exports.toJSON = function (report, cb) {
  var obj = {};
  var xmlReport = pd.xml(report);
  var error = [];

  xml2js(xmlReport, function(err, report) {
    report.checkstyle.file = report.checkstyle.file || [];

    report.checkstyle.file.forEach(function(file) {
        obj[file.$.name] = [];

        file.error.forEach(function(error) {
          error.$.linter = error.$.source;
          error.$.reason = error.$.message;

          obj[file.$.name].push(error.$);
        });
    });

    cb([obj, xmlReport]);
  });
};
