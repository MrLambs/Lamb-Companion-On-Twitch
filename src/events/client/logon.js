import { CLIENT_ID } from '../../util/constants';

module.exports = async (client) => {
    console.log('[LOGS] Lamb_Companion is online!')
    setInterval(() => {
        let channelName = 'countedsheep'
        let twitterMessage = "Don't forget to follow me on Twitter for Stream announcements and the latest news. This is the best place to stay up to date with me. https://twitter.com/countedsheep1";
        let discordMessage = "Join my Discord - The Sheep Pen! You will gain access to stream announcements and can even play games with me! https://discord.gg/cNkt8rk";

        let randomMessageArr = [];
        randomMessageArr.push(twitterMessage, discordMessage);

        let online = false;

        // client.api({
        //     url: "https://api.twitch.tv/helix/streams?countedsheep",
        //     method: "GET",
        //     headers: {
        //         "Accept": "application/vnd.twitchtv.v5+json",
        //         "Authorization": "OAuth 0lw1niydblaq2jkodr8p4zqwncvnqi",
        //         "Client-ID": CLIENT_ID
        //     }
        // }, (err, res, body) => {
        //     console.log(body);
        // });

        if (online) {
            // client.say(channelName, randomMessageArr[Math.floor(Math.random() * randomMessageArr.length)])
        }
    }, 10 * 1000)
}