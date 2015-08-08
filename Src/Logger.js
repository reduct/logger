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

    class Logger {
        constructor() {
            this.logLevel = 2;
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
         * @param targetElement {HTMLElement} An optional target element which will be appended to the log.
         * @returns {Logger}
         *
         */
        log(message, targetElement = '') {
            if (this.logLevel <= 2) {
                return this;
            }

            try {
                console.log('@reduct/component: ' + message, targetElement);
            } catch (e) {}

            return this;
        }

        /**
         * Logs a info to the console API if possible.
         *
         * @param message {String} The message to log.
         * @param targetElement {HTMLElement} An optional target element which will be appended to the info.
         * @returns {Logger}
         *
         */
        info(message, targetElement = '') {
            if (this.logLevel <= 2) {
                return this;
            }

            try {
                console.info('@reduct/component Info: ' + message, targetElement);
            } catch (e) {}

            return this;
        }

        /**
         * Logs a warning to the console API if possible.
         *
         * @param message {String} The message to log.
         * @param targetElement {HTMLElement} An optional target element which will be appended to the warning.
         * @returns {Logger}
         *
         */
        warn(message, targetElement = '') {
            if (this.logLevel <= 1) {
                return this;
            }

            try {
                console.warn('@reduct/component Warning: ' + message, targetElement);
            } catch (e) {}
        }

        /**
         * Logs a error to the console API if possible.
         *
         * @param message {String} The message to log.
         * @param targetElement {HTMLElement} An optional target element which will be appended to the error.
         * @returns {Logger}
         *
         */
        error(message, targetElement = '') {
            if (this.logLevel <= 0) {
                return this;
            }

            try {
                // We still need the console.error call since the Error object can't print out references to HTML Elements.
                console.error(message, targetElement);
            } catch (e) {}

            throw new Error('@reduct/component Error: Details are posted above.');
        }
    }

    //
    // Check for the existence of an logger instance in the global namespace,
    // and if none was found create a singleton.
    //
    if (!global.reduct.logger instanceof Logger) {
        let logger = new Logger();

        //
        // Reduce the logging noise for the unit tests.
        //
        if (factoryOpts.isTestingEnv) {
            logger.setLogLevel(0);
        }

        global.reduct.logger = logger;
    }

    return global.reduct.logger;
}
