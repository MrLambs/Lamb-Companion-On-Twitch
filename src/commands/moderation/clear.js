module.exports = {
    config: {
        name: "clear",
        description: "Clears the active twitch chat.",
        usage: ``,
        category: 'moderation'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            if (adjustedUserstate.mod !== 'mod') return client.say(channel, `${userstate.username}, sorry. You do not have permission to do that.`)
            return client.clear(channel)
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};