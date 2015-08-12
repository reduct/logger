function factory (global, factoryOpts) {
    /**
     * @private
     *
     * Checks if the given argument is a Number.
     *
     * @param num {*} The argument which will be validated.
     * @returns {boolean}
     *
     */
    function _isNumeric (num) {
        return !isNaN(num);
    }

    const logLevels = {
        ALL: 2,
        WARNINGS: 1,
        SILENT: 0
    };

    class Logger {
        constructor() {
            this.version = factoryOpts.packageVersion;
            this.logLevel = logLevels.ALL;
        }

        /**
         * Adjusts the noise of the logger.
         * 0 => No messages are displayed
         * 1 => Only severe messages are displayed
         * 2 => Every message is displayed
         *
         * @param int {Number} The new log level.
         * @returns {Logger}
         *
         */
        setLogLevel(int) {
            this.logLevel = _isNumeric(int) ? int : 2;

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
                console.log('@reduct/logger: ' + message, appendix);
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
                console.info('@reduct/logger Info: ' + message, appendix);
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
                console.warn('@reduct/logger Warning: ' + message, appendix);
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
        error(message, appendix = '') {
            if (this.logLevel < logLevels.SILENT) {
                return this;
            }

            try {
                // We still need the console.error call since the Error object can't print out references to HTML Elements/Objects etc.
                console.error(message, appendix);
            } catch (e) {}

            if (!factoryOpts.isTestingEnv) {
                throw new Error('@reduct/logger Error: Details are posted above.');
            }
        }
    }

    //
    // Check for the existence of an logger instance in the global namespace,
    // and if none was found create a singleton.
    //
    if (!(global.reduct.logger instanceof Logger)) {
        let logger = new Logger();

        //
        // Reduce the logging noise for the unit tests.
        //
        if (factoryOpts.isTestingEnv) {
            logger.setLogLevel(0);
        }

        global.reduct.logger = logger;
    }

    return {
        logger: global.reduct.logger,
        logLevels
    };
}
