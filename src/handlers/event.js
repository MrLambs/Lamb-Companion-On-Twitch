import { readdirSync } from 'fs';

module.exports = (client, commandsCollection) => {
    const load = dirs => {
        const events = readdirSync(`./src/events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dirs}/${file}`)
            let eName = file.split('.')[0]
            client.on(eName, evt.bind(null, client))
        };
    };
    ['client'].forEach(x => load(x))
};