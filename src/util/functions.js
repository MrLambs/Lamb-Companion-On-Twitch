import {
    BLOCKED_WORDS,
} from './constants'

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
    checkTwitchChat
}
