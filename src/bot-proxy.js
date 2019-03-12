const TelegramBot = require('node-telegram-bot-api');

const _bot = Symbol('bot');
const _isDebug = Symbol('isDebug');

class BotProxy {
    constructor(token, groupChatId) {
        this.chatId = groupChatId;
        //debug mode
        if (!token) {
            console.warn('[BotProxy] in debug mode. All actions will be shown in console!')
            this[_isDebug] = true;
            return this;
        }
        //telegram mode
        this[_bot] = new TelegramBot(token, { polling: true });
        this[_isDebug] = false;
    }
    onText(text, func) {
        if (this[_isDebug]) {
            console.warn("[BotProxy] in debug mode. Subscribe on text event obviously won't make any effect!")
            return;
        }
        this[_bot].onText(text, func);
    }
    sendMessageToGroup(text, htmlMode = false) {
        if (this[_isDebug]) {
            console.warn(`[BotProxy] would send a message to a group with Id = ${this.chatId} and text = ${text}, htmlMode = ${htmlMode}`);
            return;
        }

        if (!text || this.chatId == '') return;
        if (htmlMode) {
            this[_bot].sendMessage(chat_id, text, { parse_mode: "HTML", disable_web_page_preview: "true" });
        }
        else {
            this[_bot].sendMessage(chat_id, text);
        }
    }
    subscribeOnEvent(event, func) {
        if (this[_isDebug]) {
            console.warn("[BotProxy] in debug mode. Subscribe on event obviously won't make any effect!")
            return;
        }
        this[_bot].on(event, func);
    }
}

module.exports = BotProxy;