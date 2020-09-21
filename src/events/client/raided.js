module.exports = async (client, channel, target, viewers) => {
    channel = channel.substring(1)
    if (channel !== 'countedsheep') return;
    client.say(target, `@${channel} is now raiding with ${viewers} viewers!`)
}