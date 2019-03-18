const TelegramBot = require('node-telegram-bot-api');

const _bot = Symbol('bot');
const _isDebug = Symbol('isDebug');

class BotProxy {
    constructor(token, groupChatId, isDebug = null) {
        console.log(`[BotProxy] constructor. Token is${token ? '' : 'not'} presented, groupChatId: ${groupChatId}, isDebug: ${isDebug}`);

        this.chatId = groupChatId;
        //console mode
        if (!token) {
            console.warn("[BotProxy] in debug mode beacuse token wasn't presented. All actions will be shown in console!");
            this[_isDebug] = true;
            return this;
        }
        //telegram mode
        this[_bot] = new TelegramBot(token, { polling: true });
        this[_isDebug] = isDebug === null ? false : isDebug;
    }
    onText(msg, func) {
        if (!this[_bot]) {
            console.warn("[BotProxy] wasn't initalized (no token)! Obviously it can't catch any text messages.")
            return;
        }

        let cb = (msg) => {
            if (this[_isDebug]) {
                console.log(`[BotProxy]:onText has caught a message: ${JSON.stringify(msg)}`);
            }
            func(msg);
        }
        
        this[_bot].onText(msg, cb);
    }
    sendMessageToGroup(text, htmlMode = false) {
        if (!this[_bot]) {
            console.warn(`[BotProxy] wasn't initalized (no token)! It would send a message to a group with Id = ${this.chatId} and text = ${text}, htmlMode = ${htmlMode}`);
            return;
        }

        if (!text) return;
        if (!this.chatId) {
            console.log(`[BotProxy] chatId wasn't presented while initializing. Bot would send to chatGroup message: ${text}`);
            return;
        }

        if (this[_isDebug]) {
            console.log(`[BotProxy] has sent a message to chatId: ${this.chatId} with text: ${text}, htmlMode = ${htmlMode}`);
        }

        if (htmlMode) {
            this[_bot].sendMessage(this.chatId, text, { parse_mode: "HTML", disable_web_page_preview: "true" });
        }
        else {
            this[_bot].sendMessage(this.chatId, text);
        }
    }
    subscribeOnEvent(event, func) {
        if (!this[_bot]) {
            console.warn("[BotProxy] wasn't initalized (no token)! Subscribe on event obviously won't make any effect!");
            return;
        }

        if (this[_isDebug]) {
            console.log(`[BotProxy] is subscribing on event "${event}"...`);
        }

        this[_bot].on(event, func);
    }
    sendMessage(chatId, text) {
        if (!this[_bot]) {
            console.warn("[BotProxy] wasn't initalized (no token)! Sending messages is unavailable.");
            return;
        }
        if (this[_isDebug]) {
            console.log(`[BotProxy] has sent a message to chatId: ${chatId} with text: ${text}`);
        }
        this[_bot].sendMessage(chatId, text);
    }
}

module.exports = BotProxy;