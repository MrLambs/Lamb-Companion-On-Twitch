import tmi from 'tmi.js';
import { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAMES, BLOCKED_WORDS } from './constants';

const options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: BOT_USERNAME,
        password: OAUTH_TOKEN
    },
    channels: CHANNEL_NAMES
}

const client = new tmi.Client(options);

client.connect().catch(console.error);

client.on('message', async (channel, userstate, message, self) => {
    if (self) return;
    if (userstate.username === BOT_USERNAME) return;
    checkTwitchChat(userstate, message, channel);

    if (message.toLowerCase() === '!hello') {
        client.say(channel, `@${userstate.username}, heya!`);
    };

    if (message.toLowerCase() === '!discord') {
        client.say(channel, 'Join our Discord - The Sheep Pen! You will gain access to stream announcements and can even play games with me! https://discord.gg/cNkt8rk')
    };

});

function checkTwitchChat(userstate, message, channel) {
    message = message.toLocaleLowerCase();
    let shouldSendMessage = false;
    //check message
    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLocaleLowerCase()));
    if (shouldSendMessage) {
        //tell user
        client.say(channel, `@${userstate.username}, oh. That was a bad word...`)
        //delete message
        client.deletemessage(channel, userstate.id)
    }
};