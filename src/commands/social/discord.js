module.exports = {
    config: {
        name: "discord",
        description: "Drops a Discord invite to The Sheep Pen!",
        usage: ``,
        category: 'social'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            switch (channel) {
                case '#countedsheep':
                    return client.say(channel, "Join my Discord - The Sheep Pen! You will gain access to stream announcements and can even play games with me! https://discord.gg/cNkt8rk")
                    break;
                case "#enrix_tv":
                    return;
                    break;
                case "#someguywithachair":
                    return;
                    break;
                case '#prlmordial':
                    return client.say(channel, "Join my Discord - Questionably Questionable! You will gain access to stream announcements and can even play games with me! https://discord.gg/pWzJEYJ")
                    break;
            }
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};