import { ChatClient } from 'twitch-chat-client';
import { checkTwitchChat } from './util/functions';

import {
    CHANNEL_NAMES,
    authProvider
} from './util/constants'

async function main() {

    const chatBot = new ChatClient(authProvider, { channels: CHANNEL_NAMES })
    await chatBot.connect();
    
    chatBot.onMessage((channel, userstate, message, msg) => {
        if (userstate == '#lamb_companion' || !message.startsWith('!')) return;
        const args = message.slice(1).split(' ');
        const command = args.shift().toLowerCase();
        checkTwitchChat(userstate, message, channel);

        try {
            let commandFile = require(`./commands/${command}.js`)
            commandFile.run(chatBot, channel, userstate, message, args);
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        };
    })
}

main();