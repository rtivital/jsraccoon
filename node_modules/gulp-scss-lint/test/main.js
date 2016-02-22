var pluginPath = '../src/index';
var scssLintPlugin = require(pluginPath);
var chai = require('chai');
var gutil = require('gulp-util');
var fs = require('fs');
var expect = chai.expect;
var proxyquire = require('proxyquire');
var sinon = require('sinon');

var getFixtureFile = function (path) {
  return new gutil.File({
    path:  './test/fixtures/' + path,
    cwd: './test/',
    base: './test/fixtures/',
    contents: fs.readFileSync('./test/fixtures/' + path)
  });
}

describe('gulp-scss-lint', function() {
  it('invalid scss file', function(done) {
    var fakeFile = getFixtureFile('invalid.scss');

    var stream = scssLintPlugin();

    stream
      .on('data', function (file) {
        expect(file.scsslint.success).to.be.false;
        expect(file.scsslint.issues).to.have.length(4);
        expect(file.scsslint.warnings).to.equal(4);
        expect(file.scsslint.errors).to.equal(0);

        expect(file.scsslint.issues[0].line).to.exist;
        expect(file.scsslint.issues[0].column).to.exist;
        expect(file.scsslint.issues[0].length).to.exist;
        expect(file.scsslint.issues[0].severity).to.exist;
        expect(file.scsslint.issues[0].reason).to.exist;
      })
      .once('end', function() {
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('if scss-lint is not available throw an error', function(done) {
    var execStub = sinon.stub();
    execStub.callsArgWith(2, {error: true, code: 127});

    var scssLintPluginWithProxy = proxyquire(pluginPath, {
      'child_process': {
        exec: execStub,
        '@global': true
      }
    });

    var fakeFile = getFixtureFile('invalid.scss');
    var fileCount = 0;
    var stream = scssLintPluginWithProxy();
    var error = false;

    stream
      .on('data', function (file) {
        fileCount++;
      })
      .on('error', function (issue) {
        expect(issue.message).to.equal('You need to have Ruby and scss-lint gem installed');
        error = true;
      })
      .once('end', function() {
        expect(fileCount).to.equal(0);
        expect(error).to.be.true;
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('if scss_lint_reporter_checkstyle is not available throw an error', function(done) {
    var execStub = sinon.stub();
    execStub.callsArgWith(2, {error: true, code: 69});

    var childProcessStub = {exec: execStub, '@global': true};

    var scssLintPluginWithProxy = proxyquire(pluginPath, {'child_process':  childProcessStub});
    var fakeFile = getFixtureFile('invalid.scss');
    var fileCount = 0;
    var stream = scssLintPluginWithProxy();
    var error = false;

    stream
      .on('data', function (file) {
        fileCount++;
      })
      .on('error', function (issue) {
        expect(issue.message).to.equal('You need to have the scss_lint_reporter_checkstyle gem installed');
        error = true;
      })
      .once('end', function() {
        expect(fileCount).to.equal(0);
        expect(error).to.be.true;
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('validate multi scss files', function(done) {
    var fakeFile = getFixtureFile('invalid.scss');
    var fakeFile2 = getFixtureFile('invalid-error.scss');

    var stream = scssLintPlugin();

    var results = [
      {'issues': 4, 'warnings': 4, 'errors': 0},
      {'issues': 1, 'warnings': 0, 'errors': 1},
    ];

    stream
      .on('data', function (file) {
        var result = results.shift();

        expect(file.scsslint.success).to.be.false;
        expect(file.scsslint.issues).to.have.length(result.issues);
        expect(file.scsslint.warnings).to.equal(result.warnings);
        expect(file.scsslint.errors).to.equal(result.errors);
      })
      .once('end', function() {
        done();
      });

    stream.write(fakeFile);
    stream.write(fakeFile2);
    stream.end();
  });

  it('valid scss file', function(done) {
    var fakeFile = getFixtureFile('valid.scss');
    var stream = scssLintPlugin();

    stream
      .on('data', function (file) {
        expect(file.scsslint.success).to.be.true;
        expect(file.scsslint.issues).to.have.length(0);
        expect(file.scsslint.warnings).to.equal(0);
        expect(file.scsslint.errors).to.equal(0);
      })
      .once('end', function() {
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('default report call', function(done) {
    var fakeFile = getFixtureFile('invalid.scss');
    var defaultReportSpy = sinon.spy();

    var defaultReport = function (file) {
      expect(file.scsslint.success).to.be.false;
      expect(file.relative).to.be.equal('invalid.scss');
      defaultReportSpy();
    };

    var scssLintPluginWithProxy = proxyquire(pluginPath, {
      './reporters':  {
        "defaultReporter": defaultReport,
        '@global': true
      }
    });
    var stream = scssLintPluginWithProxy();

    stream
      .once('end', function() {
        expect(defaultReportSpy.calledOnce).to.be.true;
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('custom report call', function(done) {
    var fakeFile = getFixtureFile('invalid.scss');
    var customReportSpy = sinon.spy();

    var customReport = function (file, stream) {
      expect(stream.end).to.exist;
      expect(file.scsslint.success).to.be.false;
      expect(file.relative).to.be.equal('invalid.scss');
      customReportSpy();
    };

    var stream = scssLintPlugin({"customReport": customReport});

    stream
      .once('end', function() {
        expect(customReportSpy.calledOnce).to.be.true;
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('custom report throw an exception', function(done) {
    var fakeFile = getFixtureFile('invalid.scss');
    var error = false;

    var customReport = function (file, stream) {
      stream.emit('error', new gutil.PluginError("scss-lint", "some error"));
    };

    var stream = scssLintPlugin({"customReport": customReport});

    stream
      .on('error', function (issue) {
        expect(issue.message).to.be.equal("some error");
        error = true;
      })
      .once('end', function() {
        expect(error).to.be.true;
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('file pipe output', function(done) {
    var fakeFile = getFixtureFile('invalid.scss');
    var stream = scssLintPlugin({"filePipeOutput": "test.json"});

    stream
      .on('data', function (data) {
        expect(data.contents.toString('utf-8')).to.have.length.above(20);
        expect(data.path).to.be.equal('test/fixtures/test.json');
      })
      .once('end', function() {
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('xml pipe output', function(done) {
    var fakeFile = getFixtureFile('invalid.scss');
    var stream = scssLintPlugin({"filePipeOutput": "test.xml", 'reporterOutputFormat': 'Checkstyle'});

    stream
      .on('data', function (data) {
        expect(data.contents.toString('utf-8')).to.have.string('<?xml');
        expect(data.contents.toString('utf-8')).to.have.string('</checkstyle>');
        expect(data.path).to.be.equal('test/fixtures/test.xml');
      })
      .once('end', function() {
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('valid xml pipe output', function(done) {
    var fakeFile = getFixtureFile('valid.scss');
    var stream = scssLintPlugin({"filePipeOutput": "test.xml", 'reporterOutputFormat': 'Checkstyle'});

    stream
      .on('data', function (data) {
        expect(data.contents.toString('utf-8')).to.have.string('<?xml');
        expect(data.contents.toString('utf-8')).to.have.string('</checkstyle>');
        expect(data.path).to.be.equal('test/fixtures/test.xml');
      })
      .once('end', function() {
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('should not fail without files', function(done) {
    var stream = scssLintPlugin();
    var fileCount = 0;

    stream
      .on('data', function (file) {
        fileCount++;
      })
      .on('error', function(error){
        expect(error).to.equal(null);
      })
      .once('end', function() {
        expect(fileCount).to.equal(0);
        done();
      });

    stream.end();
  });

  it('should not fail with files with spaces', function(done) {
    var fakeFile = getFixtureFile('file with spaces.scss');
    var stream = scssLintPlugin();

    stream
      .on('data', function (file) {
        expect(file.scsslint.success).to.be.true;
        expect(file.scsslint.issues).to.have.length(0);
        expect(file.scsslint.warnings).to.equal(0);
        expect(file.scsslint.errors).to.equal(0);
      })
      .on('error', function(error){
        expect(error).to.equal(null);
      })
      .once('end', function() {
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('config file param', function (done) {
    var fakeFile = getFixtureFile('valid.scss');
    var stream = scssLintPlugin({'config': './test/fixtures/default.yml'});

    stream
      .on('data', function (file) {
        expect(file.scsslint.success).to.be.false;
      })
      .once('end', function() {
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('invalid config file', function (done) {
    var fakeFile = getFixtureFile('valid.scss');
    var stream = scssLintPlugin({'config': './test/fixtures/invalid-default.yml'});
    var error = false;

    stream
      .on('error', function (issue) {
        expect(issue.message).to.have.length.above(1);
        error = true;
      })
      .once('end', function() {
        expect(error).to.be.true;
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('confil file does not exist', function (done) {
    var fakeFile = getFixtureFile('valid.scss');
    var stream = scssLintPlugin({'config': './test/fixtures/no-exist.yml'});
    var error = false;

    stream
      .on('error', function (issue) {
        expect(issue.message).to.be.equal('Config file did not exist or was not readable');
        error = true;
      })
      .once('end', function() {
        expect(error).to.be.true;
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('write the json output', function(done) {
    var fakeFile = getFixtureFile('invalid.scss');

    var stream = scssLintPlugin({reporterOutput: 'test.json'});

    stream
      .once('end', function() {
        var fileContent = fs.readFileSync('test.json', 'utf8');

        expect(fileContent).to.have.length.above(1);

        fs.unlinkSync('test.json');

        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('write the xml output', function(done) {
    var fakeFile = getFixtureFile('invalid.scss');

    var stream = scssLintPlugin({reporterOutput: 'test.xml', reporterOutputFormat: 'Checkstyle'});

    stream
      .once('end', function() {
        var fileContent = fs.readFileSync('test.xml', 'utf8');

        expect(fileContent).to.have.length.above(1);

        fs.unlinkSync('test.xml');

        done();
      });

    stream.write(fakeFile);
    stream.end();
  });

  it('scss-lint src', function(done) {
    var fakeFile = getFixtureFile('invalid.scss');

    var stream = scssLintPlugin({src: 'test/fixtures/invalid.scss'});

    stream
      .on('data', function (file) {
        expect(file.scsslint.success).to.be.false;
      })
      .once('end', function() {
        done();
      });
  });


  it('should create correct bundle exec command', function (done) {
    var fakeFile = getFixtureFile('valid.scss');
    var stream = scssLintPlugin({'bundleExec': true});

    stream
      .on('data', function (file) {
        expect(file.scsslint.success).to.be.true;
      })
      .once('end', function() {
        done();
      });

    stream.write(fakeFile);
    stream.end();
  });
});
