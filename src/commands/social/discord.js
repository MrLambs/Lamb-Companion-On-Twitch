module.exports = {
    config: {
        name: "discord",
        description: "Drops a Discord invite to The Sheep Pen!",
        usage: ``,
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            client.say(channel, 'Join my Discord - The Sheep Pen! You will gain access to stream announcements and can even play games with me! https://discord.gg/cNkt8rk')
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};