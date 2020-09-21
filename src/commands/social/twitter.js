module.exports = {
    config: {
        name: "twitter",
        description: "Drops a link to Twitter",
        usage: ``,
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            switch (channel) {
                case '#countedsheep':
                    return client.say(channel, "Don't forget to follow me on Twitter for Stream announcements and the latest news. This is the best place to stay up to date with me. https://twitter.com/countedsheep1")

            }
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};