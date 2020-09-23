import bank from '../../util/config/bank.json';
import { getExampleCommand } from '../../util/functions/chatFunctions'
import { 
    verifyBankAccount, 
    verifyBetAmount,
    deductBet,
    getRpsResult,
} from '../../util/functions/casinoFunctions';

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

            await verifyBankAccount(bank, userstate);
            if (!playerBet) return client.say(channel, `${userstate.username}, make a bet first! ${exampleCommand}`);
            else if (isNaN(playerBet)) return client.say(channel, `${userstate.username}, you need to enter a real number. ${exampleCommand}`);
            else if (Number(playerBet) < 1) client.say(channel, `${userstate.username}, your bet cannot be less than 1. ${exampleCommand}`);
            else if (!verifyBetAmount(Number(playerBet), bank, userstate)) return client.say(channel, `${userstate.username}, your bet was declined. You do not have that many Lambies in your bank account. ${exampleCommand}`)
            else if (!playerChoice) return client.say(channel, `${userstate.username}, you need to choose rock, paper -or- scissors! ${exampleCommand}`)
            else if (!choicesArr.includes(playerChoice.toLowerCase())) return client.say(channel, `${userstate.username}, you need to choose rock/paper/scissors! ${exampleCommand}`)
            else {
                await deductBet(Number(playerBet), bank, userstate);
                return client.say(channel, getRpsResult(bank, userstate, Number(playerBet), playerChoice)
                )
            }
        } catch (e) {
            console.log(`[ERR] ${e.message}`)
        }
    }
};