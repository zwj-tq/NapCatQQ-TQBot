import plugin from "../libs/plugin.js";
import axios from "axios";
import { baiduGptCode } from '../../config/gpt.js'

const apiMap = new Map();

export default class wxyyPlugins extends plugin {
  constructor() {
    super({
      name: "wxyyPlugins",
      dsc: "wxyyPlugins",
      event: "message",
      rule: [
        {
          reg: /[CQ:at,qq=2733208575]/,
          fnc: "forceWxyyPlugins",
        },
      ],
    });
  }
  async forceWxyyPlugins(e) {
    const msg = e?.message?.[1];
    const text = msg?.data?.text;
    const qqId = e?.sender?.user_id;
    if (!/2733208575/.test(e?.raw_message)) {
      return;
    }

    if (text && qqId) {
      if (!apiMap.has(qqId)) {
        apiMap.set(qqId, []);
      }
      const messageData = [...apiMap.get(qqId), {
        role: "user",
        content: text
      }];

      const { data } = await axios.post(
        baiduGptCode.postUrl,
        {
          messages: messageData,
        },
        {
          params: {
            access_token: baiduGptCode.access_token,
          },  
        }
      );

      if (!data?.result) {
        return this.bot.reply(e, '请求异常请重试', false, true);
      }

      apiMap.set(qqId, [
        ...messageData,
        {
          role: "assistant",
          content: data?.result
        }
      ])

      this.bot.reply(e, data.result, false, true);
    } else {
      this.bot.reply(e, "不知道你在说什么钩八", false, true);
    }
  }
}
