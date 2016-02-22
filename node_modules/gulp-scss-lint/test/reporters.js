var proxyquire = require('proxyquire');
var gutil = require('gulp-util');
var colors = gutil.colors;
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var fs = require('fs');

var getFixtureFile = function (path) {
  return new gutil.File({
    path:  './test/fixtures/' + path,
    cwd: './test/',
    base: './test/fixtures/',
    contents: fs.readFileSync('./test/fixtures/' + path)
  });
}

var fakeFile = getFixtureFile('invalid.scss');

var getReporters = function (logMock) {
  return proxyquire('../src/reporters', {
    "gulp-util": {
      "log": logMock,
      "colors": colors
    }
  });
}

describe('reporters', function() {
  it('fail reporter, success true', function (done) {
    var fileCount = 0;
    var error = false;

    fakeFile.scsslint = {};
    fakeFile.scsslint.success = true;
    fakeFile.scsslint.issues = [];

    var log = sinon.spy();
    var failReporter = getReporters(log).failReporter();

    failReporter
      .on('data', function (file) {
        fileCount++;
        expect(file.relative).to.be.equal('invalid.scss');
      })
      .on('error', function () {
        error = true;
      })
      .once('end', function () {
        expect(fileCount).to.be.equal(1);
        expect(error).to.be.false;
        done();
      });

    failReporter.write(fakeFile);
    failReporter.emit('end');
  });

  it('fail reporter, success false', function (done) {
    var error = false;

    fakeFile.scsslint = {};
    fakeFile.scsslint.success = false;
    fakeFile.scsslint.issues = [];

    var log = sinon.spy();
    var failReporter = getReporters(log).failReporter();

    failReporter
      .on('error', function (err) {
        expect(err.message).to.be.equal('ScssLint failed for: invalid.scss');
        error = true;
      })
      .on('end', function () {
        expect(error).to.be.true;
        done();
      });

    failReporter.write(fakeFile);
    failReporter.emit('end');
  });

  describe('fail reporter, only errors', function () {
    it('the scss has errors', function (done) {
      fakeFile.scsslint = {};
      fakeFile.scsslint.success = false;
      fakeFile.scsslint.errors = 1;
      fakeFile.scsslint.issues = [];

      var error = false;
      var log = sinon.spy();
      var failReporter = getReporters(log).failReporter("E");

      failReporter
        .on('error', function (err) {
          expect(err.message).to.be.equal('ScssLint failed for: invalid.scss');
          error = true;
        })
        .once('end', function () {
          expect(error).to.be.true;
          done();
        });

      failReporter.write(fakeFile);
      failReporter.emit('end');
    });

    it('the scss does not have errors', function (done) {
      fakeFile.scsslint = {};
      fakeFile.scsslint.success = false;
      fakeFile.scsslint.errors = 0;
      fakeFile.scsslint.issues = [];

      var fileCount = 0;
      var error = false;
      var log = sinon.spy();
      var failReporter = getReporters(log).failReporter("E");

      failReporter
        .on('data', function (file) {
          fileCount++;
          expect(file.relative).to.be.equal('invalid.scss');
        })
        .on('error', function () {
          error = true;
        })
        .once('end', function () {
          expect(fileCount).to.be.equal(1);
          expect(error).to.be.false;
          done();
        });

      failReporter.write(fakeFile);
      failReporter.emit('end');
    });
  });

  it('default reporter, success true', function () {
    fakeFile.scsslint = {};
    fakeFile.scsslint.success = true;
    fakeFile.scsslint.issues = [];

    var log = sinon.spy();
    var defaultReporter = getReporters(log).defaultReporter;

    expect(log.called).to.be.false;
  });

  it('default reporter, success false', function () {
    fakeFile.scsslint = {};
    fakeFile.scsslint.success = false;
    fakeFile.scsslint.issues = [
      {"severity": "warning",
       "line": 10,
       "linter": "some linter",
       "reason": "some reasone"},
      {"severity": "error",
       "line": 13,
       "reason": "some reasone 2"}
    ];

    var log = sinon.spy();
    var defaultReporter = getReporters(log).defaultReporter;

    defaultReporter(fakeFile);

    var firstCall = log.withArgs(colors.cyan(fakeFile.scsslint.issues.length) + ' issues found in ' + colors.magenta(fakeFile.path)).calledOnce;

    var secondCall = log.withArgs(colors.cyan(fakeFile.relative) + ':' + colors.magenta(fakeFile.scsslint.issues[0].line) + colors.yellow(' [W] ') + colors.green(fakeFile.scsslint.issues[0].linter + ': ') + fakeFile.scsslint.issues[0].reason).calledOnce;


    var thirdCall = log.withArgs(colors.cyan(fakeFile.relative) + ':' + colors.magenta(fakeFile.scsslint.issues[1].line) + colors.red(' [E] ') + fakeFile.scsslint.issues[1].reason).calledOnce;

    expect(firstCall).to.be.ok;
    expect(secondCall).to.be.ok;
    expect(thirdCall).to.be.ok;
  });
});
