import {logLevels} from './logger.js';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';

chai.should();
chai.use(sinonChai);

describe('The "Logger" .warn() API', () => {
	const logger = global.reduct.logger;
	let spy;

	beforeEach(done => {
		logger.setLogLevel(logLevels.ALL);

		spy = sinon.spy(console, 'warn');

		done();
	});

	afterEach(done => {
		console.warn.restore();

		done();
	});

	it('should call the global console.warn method when warning.', done => {
		logger.warn('Something...');

		spy.should.have.callCount(1);

		done();
	});

	it('should append a appendix value to the console.warn output.', done => {
		logger.warn('Something...', {});

		spy.should.have.been.calledWith('@reduct/logger Warning: Something...', {});

		done();
	});

	it('should not log warnings when the logLevel was set to 0 or below.', done => {
		logger.setLogLevel(0);

		logger.warn('Something...');

		spy.should.have.callCount(0);

		done();
	});
});
