import { CLIENT } from '../../util/constants'

module.exports = async (client) => {
    console.log('[LOGS] Lamb_Companion is online!')
    console.log(client.getChannels());
    setInterval(() => {
        let channelName = 'countedsheep'
        let twitterMessage = "Don't forget to follow me on Twitter for Stream announcements and the latest news. This is the best place to stay up to date with me. https://twitter.com/countedsheep1";
        let discordMessage = "Join my Discord - The Sheep Pen! You will gain access to stream announcements and can even play games with me! https://discord.gg/cNkt8rk"
        let randomMessageArr = [];
        randomMessageArr.push(twitterMessage, discordMessage);
        // client.say(channelName, randomMessageArr[Math.floor(Math.random() * randomMessageArr.length)])
    }, 60 * 60 * 1000)
}