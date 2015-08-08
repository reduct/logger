/**
 *
 * @name @reduct/logger
 * @version 1.0.0
 * @license MIT
 *
 * @author Tyll Weiß <inkdpixels@gmail.com>
 * @author André König <andre.koenig@posteo.de>
 * @author Wilhelm Behncke
 *
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (factory) {
    var opts = {
        isTestingEnv: process && process.title && !! ~process.title.indexOf('reduct'),
        packageVersion: {
            major: 1,
            minor: 0,
            patch: 0
        }
    };
    var world = this;

    // Check for globals.
    if (typeof window !== "undefined") {
        world = window;
    } else if (typeof global !== "undefined") {
        world = global;
    } else if (typeof self !== "undefined") {
        world = self;
    }

    // Initiate the global reduct object if necessary.
    if (!world.reduct) {
        world.reduct = {};
    }

    // Export the factory with the global and options to all module formats.
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory(world, opts);
    } else if (typeof define === "function" && define.amd) {
        define([], function () {
            return factory(world, opts);
        });
    } else {
        world.reduct.logger = factory(world, opts);
    }
})(function factory(global, factoryOpts) {
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

    var Logger = (function () {
        function Logger() {
            _classCallCheck(this, Logger);

            this.logLevel = 2;
        }

        //
        // Check for the existence of an logger instance in the global namespace,
        // and if none was found create a singleton.
        //

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

        _createClass(Logger, [{
            key: "setLogLevel",
            value: function setLogLevel(int) {
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
        }, {
            key: "log",
            value: function log(message) {
                var targetElement = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

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
        }, {
            key: "info",
            value: function info(message) {
                var targetElement = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

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
        }, {
            key: "warn",
            value: function warn(message) {
                var targetElement = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

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
        }, {
            key: "error",
            value: function error(message) {
                var targetElement = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

                if (this.logLevel <= 0) {
                    return this;
                }

                try {
                    // We still need the console.error call since the Error object can't print out references to HTML Elements.
                    console.error(message, targetElement);
                } catch (e) {}

                throw new Error('@reduct/component Error: Details are posted above.');
            }
        }]);

        return Logger;
    })();

    if (!global.reduct.logger instanceof Logger) {
        var logger = new Logger();

        //
        // Reduce the logging noise for the unit tests.
        //
        if (factoryOpts.isTestingEnv) {
            logger.setLogLevel(0);
        }

        global.reduct.logger = logger;
    }

    return global.reduct.logger;
});