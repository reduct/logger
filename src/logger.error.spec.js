import {logLevels} from './logger.js';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

describe('The "Logger" .error() API', () => {
	const logger = global.reduct.logger;
	let spy;

	beforeEach(done => {
		logger.setLogLevel(logLevels.ALL);

		spy = sinon.spy(console, 'error');

		done();
	});

	afterEach(done => {
		console.error.restore();

		done();
	});

	it('should not call the global console.error method but throw an error when no appendifx was specified.', done => {
		const fn = () => {
			logger.error('Something...');
		};

		expect(fn).to.throw('@reduct/logger Error: Something...');

		spy.should.have.callCount(0);

		done();
	});

	it('should call the global console.error method and append a appendix value to output.', done => {
		const fn = () => {
			logger.error('Something...', {});
		};

		expect(fn).to.throw('@reduct/logger Error: Details are posted above.');

		spy.should.have.been.calledWith('Something...', {});

		done();
	});

	it('should not throw errors when the logLevel was set to -1 or below.', done => {
		logger.setLogLevel(-1);

		logger.error('Something...');

		spy.should.have.callCount(0);

		done();
	});
});
