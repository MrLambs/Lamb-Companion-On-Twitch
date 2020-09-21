import { CLIENT } from './util/constants';
import { main } from './util/functions';

main(CLIENT);

['command', 'event'].forEach(x => require(`./handlers/${x}`)(CLIENT))