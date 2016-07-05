/**
 * @private
 *
 * Checks if the given argument is a Number.
 *
 * @param num {*} The argument which will be validated.
 * @returns {boolean}
 *
 */
function _isNumeric(num) {
	return !isNaN(num);
}

const logLevels = {
	ALL: 2,
	WARNINGS: 1,
	SILENT: 0
};

class Logger {
	/**
	 * Sets up internal properties for the logger.
	 *
	 * @param namespace {String} The optional namespace for the logger.
	 * @param logLevel {Number} The optional initial logLevel for the logger.
	 */
	constructor(namespace = '@reduct/logger', logLevel = logLevels.ALL) {
		this.logLevel = logLevel;
		this.namespace = namespace;

		this.instances = [];
	}

	/**
	 * Returns customized version of the logger API.
	 *
	 * @param namespace {String} The namespace of the new logger instance.
	 */
	getLogger(namespace = this.namespace) {
		const logger = new Logger(namespace, this.logLevel);

		this.instances.push(logger);

		return {
			log: (message, appendix) => {
				logger.log(message, appendix);
			},

			info: (message, appendix) => {
				logger.info(message, appendix);
			},

			warn: (message, appendix) => {
				logger.warn(message, appendix);
			},

			error: (message, appendix) => {
				logger.error(message, appendix);
			}
		};
	}

	/**
	 * Adjusts the noise of the centralized instance of the logger.
	 * 0 => No messages are displayed
	 * 1 => Only severe messages are displayed
	 * 2 => Every message is displayed
	 *
	 * @param int {Number} The new log level.
	 * @returns {Logger}
	 *
	 */
	setLogLevel(int) {
		const logLevel = _isNumeric(int) ? int : 2;

		this.logLevel = logLevel;

		this.instances.forEach(logger => {
			logger.logLevel = logLevel;
		});

		return this;
	}

	/**
	 * Logs a message to the console API if possible.
	 *
	 * @param message {String} The message to log.
	 * @param appendix {*} An optional appendix for the log.
	 * @returns {Logger}
	 *
	 */
	log(message, appendix = '') {
		if (this.logLevel < logLevels.ALL) {
			return this;
		}

		try {
			console.log(`${this.namespace}: ${message}`, appendix);
		} catch (e) {}

		return this;
	}

	/**
	 * Logs a info to the console API if possible.
	 *
	 * @param message {String} The message to log.
	 * @param appendix {*} An optional appendix for the info log.
	 * @returns {Logger}
	 *
	 */
	info(message, appendix = '') {
		if (this.logLevel < logLevels.ALL) {
			return this;
		}

		try {
			console.info(`${this.namespace} Info: ${message}`, appendix);
		} catch (e) {}

		return this;
	}

	/**
	 * Logs a warning to the console API if possible.
	 *
	 * @param message {String} The message to log.
	 * @param appendix {*} An optional appendix for the warning.
	 * @returns {Logger}
	 *
	 */
	warn(message, appendix = '') {
		if (this.logLevel < logLevels.WARNINGS) {
			return this;
		}

		try {
			console.warn(`${this.namespace} Warning: ${message}`, appendix);
		} catch (e) {}
	}

	/**
	 * Logs a error to the console API if possible.
	 *
	 * @param message {String} The message to log.
	 * @param appendix {*} An optional appendix for the error log.
	 * @returns {Logger}
	 *
	 */
	error(message, appendix) {
		if (this.logLevel < logLevels.SILENT) {
			return this;
		}

		if (appendix) {
			try {
				// We still need the console.error call since the Error object can't print out references to HTML Elements/Objects etc.
				console.error(message, appendix);
			} catch (e) {}

			throw new Error(`${this.namespace} Error: Details are posted above.`);
		} else {
			throw new Error(`${this.namespace} Error: ${message}`);
		}
	}
}

//
// Check for the existence of the global reduct object,
// this is duplicate code, but we can't access it otherwise
// since the browserify initialization hooks in later and only in module-system free environments.
//
if (!global.reduct) {
	global.reduct = {};
}

//
// Check for the existence of an logger instance in the global namespace,
// and if none was found create a singleton.
//
if (!(global.reduct.logger instanceof Logger)) {
	const logger = new Logger();

	//
	// Reduce the logging noise for the unit tests.
	//
	try {
		if (process.env.TEST) {
			logger.setLogLevel(logLevels.SILENT);
		}
	} catch (e) {}

	global.reduct.logger = logger;
}

const logger = global.reduct.logger;

export {
	logger,
	logLevels
};

export default logger;
