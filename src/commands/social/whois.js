module.exports = {
    config: {
        name: "whois",
        description: "Copypasta",
        usage: ``,
        category: 'social'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            switch (channel) {
                case '#countedsheep':
                    return client.say(channel, "who is Countedsheep?🙄🤭🤔🥱 in math: my solution ➗☺️ in history: my king👑😣 in art: my canvas 🎨🥳 in science: my oxygen 💨😝 in geography: my world 🌎🤯")
                    break;
                case '#enrix_tv':
                    return client.say(channel, "who is Enrix?🙄🤭🤔🥱 in math: my solution ➗☺️ in history: my king👑😣 in art: my canvas 🎨🥳 in science: my oxygen 💨😝 in geography: my world 🌎🤯")
                    break;
                case '#someguywithachair':
                    return client.say(channel, "who is SomeGuyWithAChair?🙄🤭🤔🥱 in math: my solution ➗☺️ in history: my king👑😣 in art: my canvas 🎨🥳 in science: my oxygen 💨😝 in geography: my world 🌎🤯")
                    break;
            }
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};