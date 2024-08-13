import plugin from "../libs/plugin.js";

export default class 金币翻倍 extends plugin {
    constructor() {
        super({
            name: "金币翻倍",
            dsc: "金币翻倍",
            event: "message",
            rule: [
                {
                    reg: /^金币翻倍=(\d+)$/,
                    fnc: 'Doubling',
                }
            ],
        });
    }
    Doubling(e) {
        // const input = e.raw_message;
        // const regex = /^金币翻倍=(\d+)$/;
        // const match = input.match(regex);
        // let number = parseInt(match[1], 10);
        // let msg;
        // if (number >= 1000 && number <= 3000) {
        //     if (e.user_id == 943574122) {
        //         msg = `恭喜你本次获得了金币：-${number}\n`
        //             + `你通过金币翻倍累计获得了：114514的在线金币\n`
        //             + `金币翻倍的概率为：50%\n`
        //             + `欢迎下次光临(我是假ikun，别当真~)`;
        //     } else {
        //         let r = Math.random()
        //         if (r < 0.5) {
        //             number = -number;
        //         }
        //         msg = `恭喜你本次获得了金币：${number}\n`
        //             + `你通过金币翻倍累计获得了：114514的在线金币\n`
        //             + `金币翻倍的概率为：50%\n`
        //             + `欢迎下次光临(我是假ikun，别当真~)`;
        //     }
        // } else {
        //     msg = "金额错误";
        // }
        // this.bot.reply(e, msg, false, true);
    }
}