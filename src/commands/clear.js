const { userObj } = require("../util/functions")

exports.run = (client, channel, userstate, message, self, args, adjustedUserstate) => {
    console.log(adjustedUserstate.mod)
    if (adjustedUserstate.mod !== 'mod') return client.say(channel, `${userstate.username}, sorry. You do not have permission to do that.`)
    return client.clear(channel)
}