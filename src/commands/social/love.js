import { getExampleCommand } from '../../util/functions/chatFunctions';

module.exports = {
    config: {
        name: "love",
        description: "Sends love to another user.",
        usage: `[tag a user]`,
        category: 'social'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            let exampleCommand = getExampleCommand('love')
            if (!args[1]) return client.say(channel, `You need to include someone for me to send love to! ${exampleCommand}`)
            else if (args[1].slice(0, 1) !== "@") return client.say(channel, `Make sure to tag a user! ${exampleCommand}`)
            else return client.say(channel, `<3 ${userstate['display-name']} <3 sent <3 love <3 to <3 ${params[1]} <3`)
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};