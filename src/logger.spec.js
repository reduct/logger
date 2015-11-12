import {logLevels} from './logger.js';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

describe('The "Logger"', () => {
	let logger;
	let customLogger;
	let spy;

	beforeEach(done => {
		logger = global.reduct.logger;

		logger.setLogLevel(logLevels.ALL);

		customLogger = logger.getLogger('MyLogger');

		spy = sinon.spy(console, 'log');

		done();
	});

	afterEach(done => {
		console.log.restore();

		done();
	});

	it('should exist in the global scope.', done => {
		expect(logger).to.not.be.an('undefined');

		done();
	});

	it('should exist as a singleton in the global scope.', done => {
		expect(logger).to.equal(global.reduct.logger);

		done();
	});

	it('should return a namespaced API.', done => {
		expect(logger).to.be.an('object');

		done();
	});

	it('should depend on the global logLevel.', done => {
		global.reduct.logger.setLogLevel(1);

		logger.log('Something...');

		spy.should.have.callCount(0);

		done();
	});

	it('should write the given namespace in the console.log output.', done => {
		customLogger.log('Something...', {});

		spy.should.have.been.calledWith('MyLogger: Something...', {});

		done();
	});
});
