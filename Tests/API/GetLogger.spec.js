var buildTools = require('@reduct/build-tools');
var spies = require('sinon-chai');
var sinon = require('sinon');
var logLevels = require('./../../Dist/Logger.js').logLevels;
var chai = buildTools.chai;
var expect = chai.expect;

chai.use(spies);

describe('The "Logger" .getLogger() API', function suite () {
    var globalLogger;
    var logger;

    beforeEach(function before (done) {
        globalLogger = global.reduct.logger;
        logger = globalLogger.getLogger('MyLogger');

        globalLogger.setLogLevel(logLevels.ALL);

        sinon.spy(console, 'log');

        done();
    });

    afterEach(function after (done) {
        console.log.restore();

        done();
    });

    it('should return a namespaced API.', function test (done) {
        expect(logger).to.be.an('object');

        done();
    });

    it('should write the given namespace in the console.log output.', function test (done) {
        logger.log('Something...', {});

        expect(console.log).to.be.calledWith('MyLogger: Something...', {});

        done();
    });

    it('should depend on the global logLevel.', function test (done) {
        globalLogger.setLogLevel(1);

        logger.log('Something...');

        expect(console.log).to.not.be.called;

        done();
    });
});