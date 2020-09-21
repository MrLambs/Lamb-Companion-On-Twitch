import tmi from 'tmi.js';
import { OPTIONS } from './util/constants';
import { main } from './util/functions';

const client = new tmi.Client(OPTIONS);
main(client);

['command', 'event'].forEach(x => require(`./handlers/${x}`)(client))