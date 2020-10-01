module.exports = async (client) => {
    console.log('[LOGS] Lamb_Companion is online!')
    setInterval(() => {
        let rpsMessage = "Try your hand at gambling with Rock, Paper, Scissors against me! (!rps [bet] [rock/paper/scissors])"
        let randomMessageArr = [];
        ['countedsheep', 'enrix_tv'].forEach(ch => {
            switch (ch) {
                case 'countedsheep':
                    let twitterMessage = "Don't forget to follow me on Twitter for Stream announcements and the latest news. This is the best place to stay up to date with me. https://twitter.com/countedsheep1";
                    let discordMessage = "Join my Discord - The Sheep Pen! You will gain access to stream announcements and can even play games with me! https://discord.gg/cNkt8rk";
                    randomMessageArr = [];
                    randomMessageArr.push(twitterMessage, discordMessage, rpsMessage);
                    client.say('countedsheep', randomMessageArr[Math.floor(Math.random() * randomMessageArr.length)]);
                    break;
                case 'enrix_tv':
                    randomMessageArr = [];
                    randomMessageArr.push(rpsMessage);
                    client.say('enrix_tv', randomMessageArr[Math.floor(Math.random() * randomMessageArr.length)])
                    break;
                case 'someguywithachair':
                    break;
            }
        })
    }, 60 * 60 * 1000)
}