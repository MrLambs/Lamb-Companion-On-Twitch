exports.run = (client, message, args, userstate, channel, self) => {
    client.ping().then((data) => {
        let ping = Math.floor(Math.round(data * 1000));
        let choices = ["Is this really my ping?", "Is it okay? I can't look", "I hope it isn't bad", "Ruh roh raggy"];
        let response = choices[Math.floor(Math.random() * choices.length)];

        client.say(channel, `${response} - Ping: ${ping}ms`)
    })
}