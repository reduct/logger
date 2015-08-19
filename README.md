# @reduct/logger
[![Build Status](https://travis-ci.org/reduct/logger.svg)](https://travis-ci.org/reduct/logger) [![Dependency Status](https://david-dm.org/reduct/logger.svg)](https://david-dm.org/reduct/logger) [![devDependency Status](https://david-dm.org/reduct/logger/dev-status.svg)](https://david-dm.org/reduct/logger#info=devDependencies) [![Code Climate](https://codeclimate.com/github/reduct/logger/badges/gpa.svg)](https://codeclimate.com/github/reduct/logger) [![Test Coverage](https://codeclimate.com/github/reduct/logger/badges/coverage.svg)](https://codeclimate.com/github/reduct/logger/coverage)

> General logger utility for the browser and console.


## Install
With npm, use the familiar syntax e.g.:
```shell
npm install @reduct/logger --save
```

once the component package is installed, just require it in your application file.
```js
const logger = require('@reduct/logger');
```

This package also supports AMD/RequireJS. Aren't using AMD or CommonJS? Just grab a [release](https://github.com/reduct/logger/releases), include the `Dist/Logger.min.js` and access the logger via the following global:
```js
const logger = window.reductLogger;
```


## LogLevels
You will find a `logLevels` object in the export of this package.
This object holds all valid logLevels which can be used in conjunction with the [logger.setLogLevel() method](#loggersetloglevel).

| LogLevel                  | Description                          |
| ------------------------- | ------------------------------------ |
| `logLevels.SILENT`        | No messages are logged out.          |
| `logLevels.WARN`          | Only severe messages are logged out. |
| `logLevels.ALL` (Default) | All messages are logged out.         |


## API
#### logger.getLogger();
Type: `Function`
Argument `namespace`: `String`

This method will return a namespaced version of the global logger instance.
Useful to diverse between logs of different modules. The returned namespaced methods are still bound to the global
logLevel, so bear in mind that if someone calls `logger.setLogLevel(logLevels.SILENT);` no logs will be returned in your namespaced logger as well.

#### logger.setLogLevel();
Type: `Function`
Argument `int`: `Number`

This method controls the amount of logs the logger will output.
Please pass in a value of the exported `logLevels` object for future compatibility.

#### logger.log();
Type: `Function`
Argument `message`: `String`
Argument `appendix`: `*`

If possible, logs out a message to the console object.
Optionally you can specify a appendix which could be a reference to a HTML Element, an object or even a function.

#### logger.info();
Type: `Function`
Argument `message`: `String`
Argument `appendix`: `*`

Basically the same as the basic log method, but tries to access the `info` method of the console API.

#### logger.warn();
Type: `Function`
Argument `message`: `String`
Argument `appendix`: `*`

Basically the same as the basic log method, but tries to access the `warn` method of the console API.

#### logger.error();
Type: `Function`
Argument `message`: `String`
Argument `appendix`: `*`

Will log an error to your console as well as throws an error afterwards since the `Error` object cant print out
objects, functions or HTML Elements.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.


## License
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
