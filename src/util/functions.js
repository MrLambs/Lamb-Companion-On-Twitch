import {
    BLOCKED_WORDS,
} from './constants'

async function checkTwitchChat(userstate, message, channel, client) {
    message = message.toLocaleLowerCase();
    let shouldSendMessage = false;
    
    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLocaleLowerCase()));
    if (shouldSendMessage) {
        await client.deletemessage(channel, userstate.id)
        client.say(channel, `${userstate.username}, oh. You said a bad word...`)
    }
};

export {
    checkTwitchChat
}
