var buildTools = require('@reduct/build-tools');
var spies = require('sinon-chai');
var sinon = require('sinon');
var logger = require('./../Dist/Logger.js');
var chai = buildTools.chai;
var expect = chai.expect;

chai.use(spies);

describe('The "Logger"', function suite () {
    var logger;

    beforeEach(function before (done) {
        logger = global.reduct.logger;

        logger.setLogLevel(2);

        sinon.spy(console, 'log');
        sinon.spy(console, 'info');

        done();
    });

    afterEach(function after (done) {
        console.log.restore();
        console.info.restore();

        done();
    });

    it('should exist in the global scope.', function test (done) {
        expect(logger).to.not.be.undefined;

        done();
    });

    it('should exist as a singleton in the global scope.', function test (done) {
        expect(logger).to.equal(global.reduct.logger);

        done();
    });
});