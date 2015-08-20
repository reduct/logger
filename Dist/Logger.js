/**
 *
 * @name @reduct/logger
 * @version 1.0.3
 * @license MIT
 *
 * @author Tyll Weiß <inkdpixels@gmail.com>
 * @author André König <andre.koenig@posteo.de>
 * @author Wilhelm Behncke
 *
 */


(function () {
    var reductOpts = {
        isTestingEnv: false,
        packageVersion: {
            major: 1,
            minor: 0,
            patch: 3
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

    // Execute the isTestingEnv check.
    reductOpts.isTestingEnv = world.process && world.process.title && !!~world.process.title.indexOf('reduct');

    return (function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.logger = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*global reductOpts*/

/**
 * @private
 *
 * Checks if the given argument is a Number.
 *
 * @param num {*} The argument which will be validated.
 * @returns {boolean}
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _isNumeric(num) {
    return !isNaN(num);
}

var logLevels = {
    ALL: 2,
    WARNINGS: 1,
    SILENT: 0
};

var Logger = (function () {
    /**
     * Sets up internal properties for the logger.
     *
     * @param namespace {String} The optional namespace for the logger.
     * @param logLevel {Number} The optional initial logLevel for the logger.
     */

    function Logger() {
        var namespace = arguments.length <= 0 || arguments[0] === undefined ? '@reduct/logger' : arguments[0];
        var logLevel = arguments.length <= 1 || arguments[1] === undefined ? logLevels.ALL : arguments[1];

        _classCallCheck(this, Logger);

        this.version = reductOpts.packageVersion;
        this.logLevel = logLevel;
        this.namespace = namespace;

        this.instances = [];
    }

    //
    // Check for the existence of an logger instance in the global namespace,
    // and if none was found create a singleton.
    //

    /**
     * Returns customized version of the logger API.
     *
     * @param namespace {String} The namespace of the new logger instance.
     */

    _createClass(Logger, [{
        key: 'getLogger',
        value: function getLogger() {
            var namespace = arguments.length <= 0 || arguments[0] === undefined ? this.namespace : arguments[0];

            var logger = new Logger(namespace, this.logLevel);

            this.instances.push(logger);

            return {
                log: function log(message, appendix) {
                    logger.log(message, appendix);
                },

                info: function info(message, appendix) {
                    logger.info(message, appendix);
                },

                warn: function warn(message, appendix) {
                    logger.warn(message, appendix);
                },

                error: function error(message, appendix) {
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
    }, {
        key: 'setLogLevel',
        value: function setLogLevel(int) {
            var logLevel = _isNumeric(int) ? int : 2;

            this.logLevel = logLevel;

            this.instances.forEach(function (logger) {
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
    }, {
        key: 'log',
        value: function log(message) {
            var appendix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (this.logLevel < logLevels.ALL) {
                return this;
            }

            try {
                console.log(this.namespace + ': ' + message, appendix);
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
    }, {
        key: 'info',
        value: function info(message) {
            var appendix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (this.logLevel < logLevels.ALL) {
                return this;
            }

            try {
                console.info(this.namespace + ' Info: ' + message, appendix);
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
    }, {
        key: 'warn',
        value: function warn(message) {
            var appendix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (this.logLevel < logLevels.WARNINGS) {
                return this;
            }

            try {
                console.warn(this.namespace + ' Warning: ' + message, appendix);
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
    }, {
        key: 'error',
        value: function error(message) {
            var appendix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (this.logLevel < logLevels.SILENT) {
                return this;
            }

            if (appendix !== '') {
                try {
                    // We still need the console.error call since the Error object can't print out references to HTML Elements/Objects etc.
                    console.error(message, appendix);
                } catch (e) {}

                throw new Error(this.namespace + ' Error: Details are posted above.');
            } else {
                throw new Error(this.namespace + ' Error: ' + message);
            }
        }
    }]);

    return Logger;
})();

if (!(global.reductLogger instanceof Logger)) {
    var logger = new Logger();

    //
    // Reduce the logging noise for the unit tests.
    //
    if (reductOpts.isTestingEnv) {
        logger.setLogLevel(0);
    }

    global.reductLogger = logger;
}

exports['default'] = {
    logger: global.reductLogger,
    logLevels: logLevels
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
}());
                