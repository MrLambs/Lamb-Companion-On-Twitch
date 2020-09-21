module.exports = async (client, channel, target, viewers) => {
    channel = channel.substring(1)
    client.say(target, `@${channel} is now hosting for ${viewers} viewers!`)
}