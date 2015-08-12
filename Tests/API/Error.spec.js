var buildTools = require('@reduct/build-tools');
var spies = require('sinon-chai');
var sinon = require('sinon');
var logLevels = require('./../../Dist/Logger.js').logLevels;
var chai = buildTools.chai;
var expect = chai.expect;

chai.use(spies);

describe('The "Logger" .error() API', function suite () {
    var logger;

    beforeEach(function before (done) {
        logger = global.reduct.logger;

        logger.setLogLevel(logLevels.ALL);

        sinon.spy(console, 'error');

        done();
    });

    afterEach(function after (done) {
        console.error.restore();

        done();
    });

    it('should call the global console.error method when warning.', function test (done) {
        logger.error('Something...');

        expect(console.error).to.be.called;

        done();
    });

    it('should append a appendix value to the console.error output.', function test (done) {
        logger.error('Something...', {});

        expect(console.error).to.be.calledWith('Something...', {});

        done();
    });

    it('should not throw errors when the logLevel was set to -1 or below.', function test (done) {
        logger.setLogLevel(-1);

        logger.error('Something...');

        expect(console.error).to.not.be.called;

        done();
    });
});