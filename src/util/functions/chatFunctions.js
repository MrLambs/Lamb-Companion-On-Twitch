import _ from 'lodash'
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
	return _.mapKeys(user, n => _.camelCase(n));
};

const getExampleCommand = (commandName) => {
    let command = COMMANDS_COLLECTION.get(commandName.toLowerCase());
    let exampleCommand = `(${PREFIX}${command.config.name} ${command.config.usage})`;

    return exampleCommand;
}

export {
    main,
    checkTwitchChat,
    adjustUserObj,
    getExampleCommand
};