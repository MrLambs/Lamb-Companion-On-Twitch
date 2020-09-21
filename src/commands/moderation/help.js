import { readdirSync } from 'fs';
import { COMMANDS_COLLECTION } from '../../util/constants';
import { stripIndents } from 'common-tags';

module.exports = {
    config: {
        name: "help",
        description: "Help with bot commands. Commands are listed by category.",
        usage: ``,
        category: 'moderation'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            if (!args[0]) {
                const categories = readdirSync("./src/commands/")
                categories.forEach(category => {
                    const dir = [...COMMANDS_COLLECTION].filter(commandArray => commandArray[1].config.category === category)
                    const capitalizedCat = category.slice(0, 1).toUpperCase() + category.slice(1)
                    client.say(channel, stripIndents`
                    > [${capitalizedCat}]:

                    ${dir.map(c => c[1].config.name.slice(0,1).toUpperCase() + c[1].config.name.slice(1)).join(", ")}
                    `)
                })
            } else {
                let command = COMMANDS_COLLECTION.get(args[0].toLowerCase())
                if (!command) return client.say(channel, `Invalid command. Type !help for a list of all commands.`)
            
                command = command.config;

                return client.say(channel, stripIndents`
                Command: ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
                Description: ${command.description || "No description provided."}
                `)
            };
            
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};