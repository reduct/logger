var buildTools = require('@reduct/build-tools');
var spies = require('sinon-chai');
var sinon = require('sinon');
var logLevels = require('./../Dist/Logger.js').logLevels;
var chai = buildTools.chai;
var expect = chai.expect;

chai.use(spies);

describe('The "Logger"', function suite () {
    var logger;

    beforeEach(function before (done) {
        logger = global.reductLogger;

        logger.setLogLevel(logLevels.ALL);

        sinon.spy(console, 'log');

        done();
    });

    afterEach(function after (done) {
        console.log.restore();

        done();
    });

    it('should exist in the global scope.', function test (done) {
        expect(logger).to.not.be.undefined;

        done();
    });

    it('should exist as a singleton in the global scope.', function test (done) {
        expect(logger).to.equal(global.reductLogger);

        done();
    });
});