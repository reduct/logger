var buildTools = require('@reduct/build-tools');
var spies = require('sinon-chai');
var sinon = require('sinon');
var logLevels = require('./../../Dist/Logger.js').logLevels;
var chai = buildTools.chai;
var expect = chai.expect;

chai.use(spies);

describe('The "Logger" .error() API', function suite () {
    var logger = global.reductLogger;

    beforeEach(function before (done) {
        logger.setLogLevel(logLevels.ALL);

        sinon.spy(console, 'error');

        done();
    });

    afterEach(function after (done) {
        console.error.restore();

        done();
    });

    it('should not call the global console.error method but throw an error when no appendifx was specified.', function test (done) {
        expect(function logErrorWithoutAppendix () {
            logger.error('Something...');
        }).to.throw('@reduct/logger Error: Something...');

        expect(console.error).to.not.be.called;

        done();
    });

    it('should call the global console.error method and append a appendix value to output.', function test (done) {
        expect(function logErrorWithAppendix () {
            logger.error('Something...', {});
        }).to.throw('@reduct/logger Error: Details are posted above.');

        expect(console.error).to.be.calledWith('Something...', {});

        done();
    });

    it('should not throw errors when the logLevel was set to -1 or below.', function test (done) {
        logger.setLogLevel(-1);

        logger.error('Something...');

        expect(console.error).to.not.be.called;

        done();
    });

    afterEach(function after (done) {
        logger.setLogLevel(logLevels.ALL);

        done();
    });
});