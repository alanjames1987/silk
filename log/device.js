/**
 * This is the device version of ./index.js
 *
 * TODO: Unify with index.js
 */

'use strict';

const debug = require('debug');
const os = require('os');
const util = require('util');

const isAndroid = os.platform() === 'android';

const alog = isAndroid ? require('silk-alog') : undefined;

debug.formatArgs = function() {
  const args = Array.prototype.slice.call(arguments);
  const diff = debug.humanize(this.diff);

  // Mimic console.* functions by treating additional arguments as
  // printf-style arguments.
  let msg = util.format.apply(this, args);

  const format = `(+${diff}) ${msg}`;
  if (this.useColors) {
    msg = `\u001b[3${this.color}m${format}\u001b[0m`;
  } else {
    msg = format;
  }

  return [ msg ];
};

// Normally the DEBUG environment variable should be set already on device.
// However if this is not the case select a sensible default.
if (!process.env.DEBUG) {
  debug.enable('silk-*');
}

// Expected use:
//
//   import createLog from './log';
//   const log = createLog('coolfeature');
module.exports = function createLog(libraryName) {
  libraryName = `silk-${libraryName}`;

  function makeLogFunction(consoleFuncName, alogFuncName) {
    alogFuncName = alogFuncName || consoleFuncName;

    const prefix = `${libraryName}:${alogFuncName}`;
    const consoleFunc = console[consoleFuncName]; // eslint-disable-line

    const func = debug(prefix);

    if (isAndroid) {
      const alogFunc = alog[alogFuncName];
      func.log = function() {
        const args = Array.prototype.slice.call(arguments);

        if (!process.env.SILKLOG_NOCONSOLE) {
          consoleFunc.call(consoleFunc, `${prefix} ${args[0]}`);
        }

        alogFunc(libraryName, args[0]);
      };
    } else {
      func.log = function() {
        const args = Array.prototype.slice.call(arguments);
        consoleFunc.call(consoleFunc, `${prefix} ${args[0]}`);
      };
    }
    return func;
  }

  return {
    debug: makeLogFunction('log', 'debug'),
    verbose: makeLogFunction('log', 'verbose'),
    info: makeLogFunction('info'),
    warn: makeLogFunction('warn'),
    error: makeLogFunction('error'),
    fatal: makeLogFunction('error', 'fatal'),
  };
}
