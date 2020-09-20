import _ from 'lodash'
import {
    BLOCKED_WORDS,
} from './constants'

const main = async (chatBot) => {
    await chatBot.connect().catch(console.error);
    chatBot.color('CadetBlue');
};

const checkTwitchChat = async (userstate, message, channel, client, adjustedUserstate) => {
    if (adjustedUserstate.mod === 'mod') return;
    message = message.toLocaleLowerCase();
    let shouldSendMessage = false;
    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLocaleLowerCase()));
    
    if (shouldSendMessage) {
        await client.deletemessage(channel, userstate.id);
        client.say(channel, `${userstate.username}, oh. You said a bad word...`);
    };
};

function adjustUserObj(user) {
	return _.mapKeys(user, n => _.camelCase(n));
};

export {
    main,
    checkTwitchChat,
    adjustUserObj
};