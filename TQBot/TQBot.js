import { NCWebsocket } from "./NCWebsocket/index.js";
import * as fs from "node:fs";
import chokidar from "chokidar";
import { log, logDebug, logError, logWarn, selfInfo } from "../napcat.mjs";
import moment from "moment";
import lodash from "lodash";
class TQBot {
  start() {
    start();
  }
  async reloadPlugins() {
    await getPlugins(true);
    return Object.keys(handles);
  }

  reply(e, msg) {
    reply(e, msg);
  }
}
export default new TQBot();
let bot;
function start() {
  let configPath = `${fileDir}/../config/onebot11_${selfInfo.uin}.json`;
  let data = fs.readFileSync(configPath, "utf8");
  let config = JSON.parse(data);
  bot = new NCWebsocket(
    {
      baseUrl: `ws://localhost:${config.ws.port}`,
      accessToken: config.token,
    },
    config.debug
  );
  getPlugins();
  bot.connect();
}

const handles = {};
function on(key, plugin, handle) {
  bot.on(plugin.event, handle);
  handles[key] = { plugin, handle };
}
function off(key) {
  if (!handles[key]) return;
  const { plugin, handle } = handles[key];
  bot.off(plugin.event, handle);
  delete handles[key];
}

const fileDir = "./TQBot";
const pluginsDir = `${fileDir}/plugins`;
/** 导入插件 */
async function getPlugins(refresh = false) {
  if (refresh) {
    lodash.forEach(watchers, (watcher, file) => {
      watcher.close();
      delete watchers[file];
    });
    lodash.forEach(handles, (_value, key) => off(key));
  }
  const files = fs.readdirSync(pluginsDir, { withFileTypes: true });
  for (const val of files) {
    log(`[加载插件]${val.name}`);
    await changePlugin(val.name);
    watch(pluginsDir, val.name);
  }
}
/** 加载插件 */
async function changePlugin(key) {
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
            plugin[rule.fnc](message);
          }
        });
      });
      on(key, plugin, function (message) {
        lodash.forEach(handle, (handle) => handle(message));
      });
    }
  } catch (error) {
    logError(`[加载失败]${key}`);
    logError(decodeURI(error.stack));
  }
}
const watchers = {};
/** 监听热更新 */
function watch(dirName, appName) {
  const file = `./${dirName}/${appName}`;
  if (watchers[file]) return;
  const watcher = chokidar.watch(file);

  /** 监听修改 */
  watcher.on("change", (_path) => {
    log(`[修改插件]${appName}`);
    off(appName);
    changePlugin(appName);
  });

  /** 监听删除 */
  watcher.on("unlink", (_path) => {
    log(`[卸载插件]${appName}`);
    off(appName);
    /** 停止更新监听 */
    watcher.removeAllListeners("change");
  });
  watchers[file] = watcher;
}
function reply(
  e /** 信息源 */,
  msg /** 回复信息 */,
  reply = false /** 引用回复 */,
  at = false /** at回复 */
) {
  log(JSON.stringify(e));
  if (reply) {
    msg = `[CQ:reply,id=${e.message_id}] ${msg}`;
  }
  if (at) {
    msg = `[CQ:at,qq=${e.user_id}] ${msg}`;
  }
  bot.send_msg({
    message_type: e.message_type,
    user_id: e.user_id,
    group_id: e.group_id,
    message: msg,
    text: "text",
  });
}
