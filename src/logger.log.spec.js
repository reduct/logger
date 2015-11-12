import {logLevels} from './logger.js';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';

chai.should();
chai.use(sinonChai);

describe('The "Logger" .log() API', () => {
	const logger = global.reduct.logger;
	let spy;

	beforeEach(done => {
		logger.setLogLevel(logLevels.ALL);

		spy = sinon.spy(console, 'log');

		done();
	});

	afterEach(done => {
		console.log.restore();

		done();
	});

	it('should call the global console.log method when logging.', done => {
		logger.log('Something...');

		spy.should.have.callCount(1);

		done();
	});

	it('should append a appendix value to the console.log output.', done => {
		logger.log('Something...', {});

		spy.should.have.been.calledWith('@reduct/logger: Something...', {});

		done();
	});

	it('should not log when the logLevel was set to 1 or below.', done => {
		logger.setLogLevel(1);

		logger.log('Something...');

		spy.should.have.callCount(0);

		done();
	});
});
