import tmi from 'tmi.js';
import { options } from './util/constants';
import { main } from './util/functions';

const client = new tmi.Client(options);
main(client);

['command', 'event'].forEach(x => require(`./handlers/${x}`)(client))


// client.on('cheer', (channel, userstate, message) => {
//     client.say(channel, `${userstate.username} just cheered ${userstate.bits}`)
// })