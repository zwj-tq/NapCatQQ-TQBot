import plugin from '../plugin.js';
import TQBot from '../TQBot.js';
import lodash from 'lodash';
export default class reloadPlugins extends plugin {
    constructor() {
        super({
            name: "reloadPlugins",
            dsc: "reloadPlugins",
            event: "message",
            rule: [
                {
                    reg: '^强制更新$',
                    fnc: 'forceReloadPlugins',
                }
            ],
        });
    }
    async forceReloadPlugins(e) {
        const plugins = await TQBot.reloadPlugins();
        let msg = `强制更新成功${plugins.length}个插件`;
        lodash.forEach(plugins, key => msg += `\n${key}`);
        this.bot.reply(e, msg);
    }
}