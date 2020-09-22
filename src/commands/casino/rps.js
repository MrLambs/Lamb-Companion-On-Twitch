import bank from '../../util/bank.json';
import { 
    verifyBankAccount, 
    verifyBetAmount,
    deductBet,
    getRpsResult 
} from '../../util/casinoFunctions';

module.exports = {
    config: {
        name: "rps",
        description: "Play Rock, Paper, Scissors against Lamb Companion",
        usage: ``,
        category: 'casino'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        try {
            let choicesArr = ['rock', 'paper', 'scissors']
            let playerBet = args[0];
            let playerChoice = args[1];
            await verifyBankAccount(bank, userstate);
            if (!playerBet) return client.say(channel, `${userstate.username}, make a bet first! (!rps [bet] [rock/paper/scissors])`);
            else if (isNaN(playerBet)) return client.say(channel, `${userstate.username}, you need to enter a real number. (!rps [bet] [rock/paper/scissors])`);
            else if (Number(playerBet) < 1) client.say(channel, `${userstate.username}, your bet cannot be less than 1. (!rps [bet] [rock/paper/scissors])`);
            else if (!verifyBetAmount(Number(playerBet), bank, userstate)) return client.say(channel, `${userstate.username}, your bet was declined. You do not have that many Lambies in your bank account. (!rps [bet] [rock/paper/scissors])`)
            else if (!playerChoice) return client.say(channel, `${userstate.username}, you need to choose rock/paper/scissors! (!rps [bet] [rock/paper/scissors])`)
            else if (!choicesArr.includes(playerChoice.toLowerCase())) return client.say(channel, `${userstate.username}, you need to choose rock/paper/scissors! (!rps [bet] [rock/paper/scissors])`)
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