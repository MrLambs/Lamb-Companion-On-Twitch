import tmi from 'tmi.js';
import { BOT_USERNAME, options } from './util/constants';
import { checkTwitchChat } from './util/functions';

const client = new tmi.Client(options);

const main = async () => {
    await client.connect().catch(console.error);
    client.color('CadetBlue')
}
main();

client.on('message', (channel, userstate, message, self) => {
    checkTwitchChat(userstate, message, channel, client);
    if (self || !message.startsWith('!')) return;
    if (userstate.username === BOT_USERNAME) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    try {
        let commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, channel, userstate, message, self, args);
    } catch (e) {
        console.log(`[ERR] ${e.message}`)
    };
});