import tmi from 'tmi.js';
import { BOT_USERNAME, options } from './util/constants';
import { main, checkTwitchChat, userObj } from './util/functions';

const client = new tmi.Client(options);
main(client);

client.on('message', (channel, userstate, message, self) => {
    let adjustedUserstate = userObj(userstate);
    checkTwitchChat(userstate, message, channel, client, adjustedUserstate);
    if (self || !message.startsWith('!')) return;
    if (userstate.username === BOT_USERNAME) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, channel, userstate, message, self, args, adjustedUserstate);
    } catch (e) {
        console.log(`[ERR] ${e.message}`);
    };
});

client.on('hosting', (channel, target, viewers) => {
    channel = channel.substring(1)
    client.say(target, `@${channel} is now hosting for ${viewers} viewers!`)
});