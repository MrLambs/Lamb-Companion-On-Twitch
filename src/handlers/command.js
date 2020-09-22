import { readdirSync } from 'fs';
import { COMMANDS_COLLECTION } from '../util/constants'

module.exports = () => {
    const load = dirs => {
        const commands = readdirSync(`./src/commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            const pull = require(`../commands/${dirs}/${file}`)
            COMMANDS_COLLECTION.set(pull.config.name, pull);
        }
    }
    ['moderation', 'social', 'casino'].forEach(x => load(x))
}