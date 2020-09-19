import {
    BLOCKED_WORDS,
    BOT_USERNAME,
    OAUTH_TOKEN,
    CHANNEL_NAMES
} from './constants'

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
};

function checkTwitchChat(userstate, message, channel) {
    message = message.toLocaleLowerCase();
    let shouldSendMessage = false;
    
    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLocaleLowerCase()));
    if (shouldSendMessage) {
        client.say(channel, `@${userstate.username}, oh. That was a bad word...`)
        client.deletemessage(channel, userstate.id)
    }
};

export {
    options,
    checkTwitchChat
}
