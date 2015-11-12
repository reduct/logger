import {logLevels} from './logger.js';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';

chai.should();
chai.use(sinonChai);

describe('The "Logger" .info() API', () => {
	const logger = global.reduct.logger;
	let spy;

	beforeEach(done => {
		logger.setLogLevel(logLevels.ALL);

		spy = sinon.spy(console, 'info');

		done();
	});

	afterEach(done => {
		console.info.restore();

		done();
	});

	it('should call the global console.info method when logging a info.', done => {
		logger.info('Something...');

		spy.should.have.callCount(1);

		done();
	});

	it('should append a appendix value to the console.info output.', done => {
		logger.info('Something...', {});

		spy.should.have.been.calledWith('@reduct/logger Info: Something...', {});

		done();
	});

	it('should not log infos when the logLevel was set to 1 or below.', done => {
		logger.setLogLevel(1);

		logger.info('Something...');

		spy.should.have.callCount(0);

		done();
	});
});
