module.exports = async (client, channel, username, method, message, userstate) => {
    let channelWithoutHash = channel.substring(1)
    if (channelWithoutHash !== 'countedsheep') return;
    if (username === channelWithoutHash) return;
    client.say(channel, `${username} just subscribed!! Thank you!`)
}