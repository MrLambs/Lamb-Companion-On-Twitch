import { getExampleCommand, titleCase } from '../../util/functions/chatFunctions'
import {
    verifyBetAmount,
    deductBet,
    getRouletteResult,
    returnBet,
    addWinnings
} from '../../util/functions/casinoFunctions';
const User = require('../../models/user')

module.exports = {
    config: {
        name: "roulette",
        description: "Play roulette - last color printed wins!",
        usage: `[bet] [black/red]`,
        category: 'casino'
    },
    run: async (client, channel, userstate, message, self, args, adjustedUserstate) => {
        let playerBet = args[0];
        let playerChoice = args[1];
        if (!playerBet || !Number(playerBet) || Number(playerBet) < 1) return client.say(channel, `You must make a bet first! Your bet cannot be less than 1. ${getExampleCommand('roulette')}`)
        else if (!playerChoice) return client.say(channel, `You must choose [red/black] first! ${getExampleCommand('roulette')}`)
        else {
            playerChoice = playerChoice.toLowerCase();
            playerBet = Number(playerBet);
            try {
                let rouletteGame = getRouletteResult(playerChoice);
                User
                    .findOne({ twitch_id: userstate['user-id'] })
                    .then(async user => {
                        if (user) {
                            verifyBetAmount(playerBet, userstate).then(async verified => {
                                if (!verified) return client.say(channel, `Sorry ${userstate['display-name']}, your bet was declined. Bet cannot exceed 100 Lambies -or- you do not have enough in your account to complete that bet.`)
                                else {
                                    await client.say(channel, `${rouletteGame.newMessage}`);
                                    switch (rouletteGame.result) {
                                        case 'won':
                                            await addWinnings(playerBet, userstate)
                                            return client.say(channel, `Congrats ${userstate['display-name']}, you won! Result: ${titleCase(rouletteGame.lastColor)} - [${user.money + playerBet} Lambies]`);
                                            break;
                                        case 'lost':
                                            await deductBet(playerBet, userstate)
                                            return client.say(channel, `Sorry ${userstate['display-name']}, you lost! Result: ${titleCase(rouletteGame.lastColor)} - [${user.money - playerBet} Lambies]`);
                                            break;
                                    }
                                }
                            })    
                        }
                    })
            } catch (e) {
                console.log(`[ERR] ${e.message}`);
                return client.say(channel, `Oops, something went wrong. Your bet was returned. Please try again. - [${user.money} Lambies]`)
            }
        }
    }
};