var buildTools = require('@reduct/build-tools');
var spies = require('sinon-chai');
var sinon = require('sinon');
var logLevels = require('./../../Dist/Logger.js').logLevels;
var chai = buildTools.chai;
var expect = chai.expect;

chai.use(spies);

describe('The "Logger" .log() API', function suite () {
    var logger;

    beforeEach(function before (done) {
        logger = global.reduct.logger;

        logger.setLogLevel(logLevels.ALL);

        sinon.spy(console, 'log');

        done();
    });

    afterEach(function after (done) {
        console.log.restore();

        done();
    });

    it('should call the global console.log method when logging.', function test (done) {
        logger.log('Something...');

        expect(console.log).to.be.called;

        done();
    });

    it('should append a appendix value to the console.log output.', function test (done) {
        logger.log('Something...', {});

        expect(console.log).to.be.calledWith('@reduct/logger: Something...', {});

        done();
    });

    it('should not log when the logLevel was set to 1 or below.', function test (done) {
        logger.setLogLevel(1);

        logger.log('Something...');

        expect(console.log).to.not.be.called;

        done();
    });
});