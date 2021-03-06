import { mapKeys, camelCase } from 'lodash'
import {
    BLOCKED_WORDS,
    COMMANDS_COLLECTION,
    PREFIX
} from '../constants/chatConstants'

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

const adjustUserObj = (user) => {
	return mapKeys(user, n => camelCase(n));
};

const getExampleCommand = (commandName) => {
    let command = COMMANDS_COLLECTION.get(commandName.toLowerCase());
    let exampleCommand = `(${PREFIX}${command.config.name} ${command.config.usage})`;

    return exampleCommand;
};

const getNeededXp = (level) => {
    return level * level * 100;
};

const titleCase = oldStr => {
    return oldStr.charAt(0).toUpperCase() + oldStr.slice(1).toLowerCase()
};

export {
    main,
    checkTwitchChat,
    adjustUserObj,
    getExampleCommand,
    getNeededXp,
    titleCase
};