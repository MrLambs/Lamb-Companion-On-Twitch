import bank from '../../util/config/bank.json';
import { verifyBankAccount } from '../../util/functions/casinoFunctions';

module.exports = {
    config: {
        name: "balance",
        description: "Views your current Lambies balance",
        usage: ``,
        category: 'casino'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            await verifyBankAccount(bank, userstate);
            client.say(channel, `${userstate.username}, you currently have ${bank[userstate['user-id']].money} Lambies in your account.`)
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};