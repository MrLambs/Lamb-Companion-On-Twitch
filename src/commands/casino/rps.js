import { getExampleCommand } from '../../util/functions/chatFunctions'
import {
    verifyBankAccount,
    verifyBetAmount,
    deductBet,
    getRpsResult,
} from '../../util/functions/casinoFunctions';
const User = require('../../models/user')

module.exports = {
    config: {
        name: "rps",
        description: "Play Rock, Paper, Scissors against Lamb Companion",
        usage: `[bet] [rock/paper/scissors]`,
        category: 'casino'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            let choicesArr = ['rock', 'paper', 'scissors']
            let playerBet = args[0];
            let playerChoice = args[1];
            let exampleCommand = getExampleCommand('rps');

            await verifyBankAccount(userstate);
            if (!playerBet) return client.say(channel, `${userstate['display-name']}, make a bet first! ${exampleCommand}`);
            else if (isNaN(playerBet)) return client.say(channel, `${userstate['display-name']}, you need to enter a real number. ${exampleCommand}`);
            else if (Number(playerBet) < 1) client.say(channel, `${userstate['display-name']}, your bet cannot be less than 1. ${exampleCommand}`);
            else if (!playerChoice) return client.say(channel, `${userstate['display-name']}, you need to choose rock, paper -or- scissors! ${exampleCommand}`)
            else if (!choicesArr.includes(playerChoice.toLowerCase())) return client.say(channel, `${userstate['display-name']}, you need to choose rock, paper -or- scissors! ${exampleCommand}`)
            else {
                User.findOne({ twitch_id: userstate['user-id'] })
                    .then(user => {
                        if (user) {
                            verifyBetAmount(Number(playerBet), userstate).then(async verified => {
                                if (verified) { 
                                    await deductBet(Number(playerBet), userstate)
                                    getRpsResult(userstate, Number(playerBet), playerChoice)
                                    .then(rpsRes => {
                                        if (rpsRes) {
                                            client.say(channel, rpsRes)
                                        }
                                    })
                                } else {
                                    client.say(channel, `${userstate['display-name']}, your bet was declined. You do not have that many Lambies in your bank account. ${exampleCommand}`)
                                }
                            })
                        } else client.say(channel, `${userstate['display-name']} since you do not have a Lambies account yet, I have created a new account for you and added a 100 Lambies bonus! Please type !rps again to play. Thanks!`)
                    })
            }
        } catch(e) {
        console.log(`[ERR] ${e.message}`)
    }
}
};