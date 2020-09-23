import { verifyBankAccount } from '../../util/functions/casinoFunctions';
const User = require('../../models/user');

module.exports = {
    config: {
        name: "balance",
        description: "Views your current Lambies balance",
        usage: ``,
        category: 'casino'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            await verifyBankAccount(userstate)
            User
            .findOne({ twitch_id: userstate['user-id']})
            .then(user => {
                if (user) client.say(channel, `${user.display_name}, you currently have ${user.money} Lambies in your account.`)
                else client.say(channel, `${userstate['display-name']} since you do not have a Lambies account yet, I have created a new account for you and added a 100 Lambies bonus! Please type !balance again to view your new account. Thanks!`)
            })
            
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};