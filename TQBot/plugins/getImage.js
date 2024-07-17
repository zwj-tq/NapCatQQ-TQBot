import { log } from 'console';
import plugin from '../plugin.js';

export default class getImage extends plugin {
    constructor() {
        super({
            name: "getImage",
            dsc: "取图片",
            event: "message",
            rule: [
                {
                    reg: /\[CQ:reply,id=-\d+\]\s*取图片\s*$/,
                    fnc: 'getImage',
                },
            ],
        });
    }
    getImage(e, rule) {
        const pattern = rule.reg;
        const match = e.raw_message.match(pattern);
        if (match) {
            const idString = match[0];  // 匹配到的整个字符串
            const idPattern = /-\d+/;
            const id = idString.match(idPattern)[0];  // 提取id部分
            this.bot.get_msg({ message_id: id }).then((data) => {
                log(data);
            });
        }
    }
}