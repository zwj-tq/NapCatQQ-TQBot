export const CQ = {
    text: function (data) {
        return { type: 'text', data };
    },
    at: function (data) {
        return { type: 'at', data };
    },
    reply: function (data) {
        return { type: 'reply', data };
    },
    face: function (data) {
        return { type: 'face', data };
    },
    mface: function (data) {
        return { type: 'mface', data };
    },
    image: function (data) {
        return { type: 'image', data };
    },
    file: function (data) {
        return { type: 'file', data };
    },
    video: function (data) {
        return { type: 'video', data };
    },
    miniapp: function (data) {
        return { type: 'miniapp', data };
    },
    record: function (data) {
        return { type: 'record', data };
    },
    json: function (data) {
        return { type: 'json', data };
    },
    dice: function (data) {
        return { type: 'dice', data };
    },
    rps: function (data) {
        return { type: 'rps', data };
    },
    markdown: function (data) {
        return { type: 'markdown', data };
    },
    music: function (data) {
        return { type: 'music', data };
    },
    node: function (data) {
        return { type: 'node', data };
    }
};
