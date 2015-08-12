var buildTools = require('@reduct/build-tools');
var spies = require('sinon-chai');
var sinon = require('sinon');
var logger = require('./../../Dist/Logger.js');
var chai = buildTools.chai;
var expect = chai.expect;

chai.use(spies);

describe('The "Logger" .warn() API', function suite () {
    var logger;

    beforeEach(function before (done) {
        logger = global.reduct.logger;

        logger.setLogLevel(2);

        sinon.spy(console, 'warn');

        done();
    });

    afterEach(function after (done) {
        console.warn.restore();

        done();
    });

    it('should call the global console.warn method when warning.', function test (done) {
        logger.warn('Something...');

        expect(console.warn).to.be.called;

        done();
    });

    it('should append a appendix value to the console.warn output.', function test (done) {
        logger.warn('Something...', {});

        expect(console.warn).to.be.calledWith('@reduct/logger Warning: Something...', {});

        done();
    });

    it('should not log warnings when the logLevel was set to 0 or below.', function test (done) {
        logger.setLogLevel(0);

        logger.warn('Something...');

        expect(console.warn).to.not.be.called;

        done();
    });
});