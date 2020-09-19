import tmi from 'tmi.js';
import { OPTIONS } from './util/constants'
import { checkTwitchChat } from './util/functions';

const client = new tmi.Client(OPTIONS);

client.connect().catch(console.error);

client.on('message', async (channel, userstate, message, self) => {
    if (self || !message.startsWith('!')) return;
    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    checkTwitchChat(userstate, message, channel);

    try {
        let commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args, userstate, channel, self);
    } catch (e) {
        console.log(`[ERR] ${e.message}`)
    };
});