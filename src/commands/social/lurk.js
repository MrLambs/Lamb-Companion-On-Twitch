module.exports = {
    config: {
        name: "lurk",
        description: "Identify the lurkers",
        usage: ``,
        category: 'social'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            switch (channel) {
                case '#countedsheep':
                    return client.say(channel, `${userstate[`display-name`]} is lurking! I love and appreciate my lurkers more than words can say, so make sure to drop a !lurk in chat if you are watching in the background. Thank you!`)
            }
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};