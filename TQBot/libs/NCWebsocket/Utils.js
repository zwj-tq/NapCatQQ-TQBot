export const getTime = () => new Date().toLocaleString();
export const logger = {
    log: (...args) => {
        console.log(`[${getTime()}]`, ...args);
    },
    warn: (...args) => {
        console.warn(`[${getTime()}]`, ...args);
    },
    debug: (...args) => {
        console.debug(`[${getTime()}]`, ...args);
    },
    dir: (json) => {
        console.dir(json, { depth: null });
    }
};
export const SPLIT = /(?=\[CQ:)|(?<=])/;
export const CQ_TAG_REGEXP = /^\[CQ:([a-z]+)(?:,([^\]]+))?]$/;
export const CQ_TAG_JSON_REGEXP = /^\[CQ:json,data=(\{.*\})\]$/;
/**
 * CQ码转JSON
 */
export function convertCQCodeToJSON(msg) {
    msg = CQCodeDecode(msg);
    let msgArr = [];
    msg.split(SPLIT).forEach((value) => {
        if (value.at(0) !== '[' && value.at(value.length - 1) === ']' && msgArr.length > 0) {
            msgArr[msgArr.length - 1] += value;
        }
        else {
            msgArr.push(value);
        }
    });
    return msgArr.map((tagStr) => {
        const json = CQ_TAG_JSON_REGEXP.exec(tagStr);
        if (json !== null)
            return { type: 'json', data: { data: json[1] } };
        const match = CQ_TAG_REGEXP.exec(tagStr);
        if (match === null)
            return { type: 'text', data: { text: tagStr } };
        const [, tagName, value] = match;
        if (value === undefined)
            return { type: tagName, data: {} };
        const data = Object.fromEntries(value.split(',').map((v) => {
            const index = v.indexOf('=');
            const key = v.slice(0, index);
            let value = v.slice(index + 1);
            if (!isNaN(parseInt(value))) {
                value = parseInt(value);
            }
            return [key, value];
        }));
        return { type: tagName, data };
    });
}
/**
 * JSON转CQ码
 */
export function convertJSONToCQCode(json) {
    const conver = (json) => {
        if (json.type === 'text')
            return json.data.text;
        return `[CQ:${json.type}${Object.entries(json.data)
            .map(([k, v]) => (v ? `,${k}=${v}` : ''))
            .join('')}]`;
    };
    if (Array.isArray(json)) {
        return json.map((item) => conver(item)).join('');
    }
    else {
        return conver(json);
    }
}
export function CQCodeDecode(str) {
    return str
        .replace(/&#44;/g, ',')
        .replace(/&#91;/g, '[')
        .replace(/&#93;/g, ']')
        .replace(/&amp;/g, '&');
}
export function CQCodeEncode(str) {
    return str
        .replace(/,/g, '&#44;')
        .replace(/\[/g, '&#91;')
        .replace(/]/g, '&#93;')
        .replace(/&/g, '&amp;');
}
