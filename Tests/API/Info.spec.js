var buildTools = require('@reduct/build-tools');
var spies = require('sinon-chai');
var sinon = require('sinon');
var logLevels = require('./../../Dist/Logger.js').logLevels;
var chai = buildTools.chai;
var expect = chai.expect;

chai.use(spies);

describe('The "Logger" .info() API', function suite () {
    var logger;

    beforeEach(function before (done) {
        logger = global.reduct.logger;

        logger.setLogLevel(logLevels.ALL);

        sinon.spy(console, 'info');

        done();
    });

    afterEach(function after (done) {
        console.info.restore();

        done();
    });

    it('should call the global console.info method when logging a info.', function test (done) {
        logger.info('Something...');

        expect(console.info).to.be.called;

        done();
    });

    it('should append a appendix value to the console.info output.', function test (done) {
        logger.info('Something...', {});

        expect(console.info).to.be.calledWith('@reduct/logger Info: Something...', {});

        done();
    });

    it('should not log infos when the logLevel was set to 1 or below.', function test (done) {
        logger.setLogLevel(1);

        logger.info('Something...');

        expect(console.info).to.not.be.called;

        done();
    });
});