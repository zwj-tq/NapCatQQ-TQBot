import { NCWebsocket } from "./NCWebsocket/index.js";
import * as fs from "node:fs";
import chokidar from "chokidar";
import { log, logDebug, logError, logWarn, selfInfo } from "../napcat.mjs";
import moment from "moment";
import lodash from "lodash";

const fileDir = "./TQBot";
const pluginsDir = `${fileDir}/plugins`;
class TQBot extends NCWebsocket {
  #watchers = {};
  #handles = {};
  start() {
    let configPath = `${fileDir}/../config/onebot11_${selfInfo.uin}.json`;
    let data = fs.readFileSync(configPath, "utf8");
    let config = JSON.parse(data);
    this.connect({
      baseUrl: `ws://localhost:${config.ws.port}`,
      accessToken: config.token,
    });
    this.getPlugins();
  }
  regist(key, plugin, handle) {
    bot.on(plugin.event, handle);
    this.#handles[key] = { plugin, handle };
  }
  deregist(key) {
    if (!this.#handles[key]) return;
    const { plugin, handle } = this.#handles[key];
    bot.off(plugin.event, handle);
    delete this.#handles[key];
  }

  /** 导入插件 */
  async getPlugins(refresh = false) {
    if (refresh) {
      lodash.forEach(this.#watchers, (watcher, file) => {
        watcher.close();
        delete this.#watchers[file];
      });
      lodash.forEach(this.#handles, (_value, key) => this.deregist(key));
    }
    const files = fs.readdirSync(pluginsDir, { withFileTypes: true });
    for (const val of files) {
      log(`[加载插件]${val.name}`);
      await this.changePlugin(val.name);
      this.watch(pluginsDir, val.name);
    }
    return Object.keys(this.#handles);
  }
  /** 加载插件 */
  async changePlugin(key) {
    try {
      const app = await import(`./plugins/${key}?${moment().format("x")}`);
      if (!app.default) return;
      const plugin = new app.default();
      if (plugin.rule) {
        const handle = [];
        lodash.forEach(plugin.rule, (rule) => {
          handle.push(function (message) {
            if (!new RegExp(rule.reg).test(message.raw_message)) return false;
            if (plugin[rule.fnc]) {
              plugin[rule.fnc](message, rule);
            }
          });
        });
        this.regist(key, plugin, function (message) {
          lodash.forEach(handle, (handle) => handle(message));
        });
      }
    } catch (error) {
      logError(`[加载失败]${key}`);
      logError(decodeURI(error.stack));
    }
  }
  /** 监听热更新 */
  watch(dirName, appName) {
    const file = `./${dirName}/${appName}`;
    if (this.#watchers[file]) return;
    const watcher = chokidar.watch(file);

    /** 监听修改 */
    watcher.on("change", (_path) => {
      log(`[修改插件]${appName}`);
      this.deregist(appName);
      this.changePlugin(appName);
    });

    /** 监听删除 */
    watcher.on("unlink", (_path) => {
      log(`[卸载插件]${appName}`);
      this.deregist(appName);
      /** 停止更新监听 */
      watcher.removeAllListeners("change");
    });
    this.#watchers[file] = watcher;
  }

}
export const bot = new TQBot();
