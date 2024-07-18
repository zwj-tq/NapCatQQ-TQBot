import { bot as TQBot } from "../TQBot.js"
export default class plugin {
    /**
     * @param name 插件名称
     * @param dsc 插件描述
     * @param handler handler配置
     * @param handler.key handler支持的事件key
     * @param handler.fn handler的处理func
     * @param namespace namespace，设置handler时建议设置
     * @param event 执行事件，默认message
     * @param priority 优先级，数字越小优先级越高
     * @param rule
     * @param rule.reg 命令正则
     * @param rule.fnc 命令执行方法
     * @param rule.event 执行事件，默认message
     * @param rule.log  false时不显示执行日志
     * @param rule.permission 权限 master,owner,admin,all
     * @param task
     * @param task.name 定时任务名称
     * @param task.cron 定时任务cron表达式
     * @param task.fnc 定时任务方法名
     * @param task.log  false时不显示执行日志
     */
    constructor({
        name = "your-plugin",
        dsc = "无",
        handler,
        namespace,
        event = "message",
        priority = 5000,
        task = { fnc: "", cron: "" },
        rule = [],
        bot = TQBot,
    }) {
        /** 插件名称 */
        this.name = name
        /** 插件描述 */
        this.dsc = dsc
        /** 监听事件，默认message https://oicqjs.github.io/oicq/#events */
        this.event = event
        /** 优先级 */
        this.priority = priority
        /** 定时任务，可以是数组 */
        this.task = {
            /** 任务名 */
            name: "",
            /** 任务方法名 */
            fnc: task.fnc || "",
            /** 任务cron表达式 */
            cron: task.cron || ""
        }
        /** 命令规则 */
        this.rule = rule
        if (handler) {
            this.handler = handler
            this.namespace = namespace || ""
        }
        this.bot = bot;
    }
}