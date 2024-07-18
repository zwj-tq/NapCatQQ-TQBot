import chalk from 'chalk';
import log4js from 'log4js';
let LogLevel = /* @__PURE__ */ function (LogLevel2) {
    LogLevel2["DEBUG"] = "debug";
    LogLevel2["INFO"] = "info";
    LogLevel2["WARN"] = "warn";
    LogLevel2["ERROR"] = "error";
    LogLevel2["FATAL"] = "fatal";
    return LogLevel2;
}({});
const logConfig = {
    appenders: {
        ConsoleAppender: {
            // 输出到控制台的appender
            type: "console",
            layout: {
                type: "pattern",
                pattern: `%d{yyyy-MM-dd hh:mm:ss} [%[%p%]] [${chalk.cyan("TQBot")}] | %m`
            }
        }
    },
    categories: {
        default: {
            appenders: ["ConsoleAppender"],
            level: "debug"
        },
        console: {
            appenders: ["ConsoleAppender"],
            level: "debug"
        }
    }
};
log4js.configure(logConfig);
const loggerConsole = log4js.getLogger("console");
const loggerDefault = log4js.getLogger("default");
let fileLogEnabled = true;
let consoleLogEnabled = true;
function formatMsg(msg) {
    let logMsg = "";
    for (const msgItem of msg) {
        if (typeof msgItem === "object") {
            const obj = JSON.parse(JSON.stringify(msgItem, null, 2));
            logMsg += JSON.stringify(truncateString(obj)) + " ";
            continue;
        }
        logMsg += msgItem + " ";
    }
    return logMsg;
}
function truncateString(obj, maxLength = 500) {
    if (obj !== null && typeof obj === "object") {
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "string") {
                if (obj[key].length > maxLength) {
                    obj[key] = obj[key].substring(0, maxLength) + "...";
                }
            } else if (typeof obj[key] === "object") {
                truncateString(obj[key], maxLength);
            }
        });
    }
    return obj;
}
const colorEscape = /\x1B[@-_][0-?]*[ -/]*[@-~]/g;
function _log(level, ...args) {
    if (consoleLogEnabled) {
        loggerConsole[level](formatMsg(args));
    }
}
export function enableConsoleLog(enable) {
    consoleLogEnabled = enable;
}
export function setLogLevel(consoleLogLevel) {
    logConfig.categories.console.level = consoleLogLevel;
    log4js.configure(logConfig);
}
export function log(...args) {
    _log(LogLevel.INFO, ...args);
}
export function logDebug(...args) {
    _log(LogLevel.DEBUG, ...args);
}
export function logError(...args) {
    _log(LogLevel.ERROR, ...args);
}
export function logWarn(...args) {
    _log(LogLevel.WARN, ...args);
}
export const logger = {
    enableConsoleLog: (enable) => {
        enableConsoleLog(enable);
    },
    setLogLevel: (consoleLogLevel) => {
        setLogLevel(consoleLogLevel);
    },
    log: (...args) => {
        log(...args);
    },
    logDebug: (...args) => {
        logDebug(...args);
    },
    logError: (...args) => {
        logError(...args);
    },
    logWarn: (...args) => {
        logWarn(...args);
    }
}