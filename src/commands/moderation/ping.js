module.exports = {
    config: {
        name: "ping",
        description: "PONG! Displays the api & bot latency",
        usage: ``,
    },
    run: async (client, channel, userstate, message, self, args) => {
        try {
            client.ping()
                .then(data => {
                    let ping = Math.floor(Math.round(data * 1000))
                    let choices = ["Is this really my ping?", "Is it okay? I can't look", "I hope it isn't bad", "Ruh roh raggy"];
                    let response = choices[Math.floor(Math.random() * choices.length)];

                    client.say(channel, `${response} -- Ping: ${ping}ms`)

                })
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};