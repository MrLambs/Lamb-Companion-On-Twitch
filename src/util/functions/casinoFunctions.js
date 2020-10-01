const User = require('../../models/user')

const addWinnings = (amount, userstate) => {
    try {
        User.findOne({ twitch_id: userstate['user-id'] })
            .then(curUser => {
                curUser.money += (amount);
                curUser.save().catch(err => console.log(`[ERR] ${err.message}`));
            })
    } catch (err) {
        console.log(`[ERR] ${err.message}`)
    }
};

const returnBet = (amount, userstate) => {
    try {
        User.findOne({ twitch_id: userstate['user-id'] })
            .then(curUser => {
                curUser.money += amount;
                curUser.save().catch(err => console.log(`[ERR] ${err.message}`));
            })
    } catch (err) {
        console.log(`[ERR] ${err.message}`)
    }

};

const deductBet = (amount, userstate) => {
    try {
        User.findOne({ twitch_id: userstate['user-id'] })
            .then(curUser => {
                curUser.money -= amount;
                curUser.save().catch(err => console.log(`[ERR] ${err.message}`));
            })
    } catch (err) {
        console.log(`[ERR] ${err.message}`)
    }
};

const verifyBetAmount = (amount, userstate) => {
    let verified = false;
    return User
        .findOne({ twitch_id: userstate['user-id'] })
        .then(user => {
            if (amount <= user.money && amount <= 100) return verified = true;
            else return verified
        })
}

const getRpsResult = (userstate, bet, userChoice) => {
    const chooseArr = ['rock', 'paper', 'scissors'];
    userChoice = userChoice.toLowerCase();
    let clientChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    return User.findOne({ twitch_id: userstate['user-id'] })
        .then(user => {
            if (
                (userChoice === "rock" && clientChoice === "scissors") ||
                (userChoice === "paper" && clientChoice === "rock") ||
                (userChoice === "scissors" && clientChoice === "paper")
            ) {
                addWinnings(bet, userstate);
                return `${userstate['display-name']}, you won! [${userChoice.slice(0, 1).toUpperCase() + userChoice.slice(1)} (You) -VS- ${clientChoice.slice(0, 1).toUpperCase() + clientChoice.slice(1)} (Bot)] [${user.money + bet} Lambies]`
            } else if (userChoice === clientChoice) {
                returnBet(bet, userstate);
                return `${userstate['display-name']}, it's a tie! [${userChoice.slice(0, 1).toUpperCase() + userChoice.slice(1)} (You) -VS- ${clientChoice.slice(0, 1).toUpperCase() + clientChoice.slice(1)} (Bot)] [${user.money} Lambies]`
            } else {
                return `${userstate['display-name']}, you lost! [${userChoice.slice(0, 1).toUpperCase() + userChoice.slice(1)} (You) -VS- ${clientChoice.slice(0, 1).toUpperCase() + clientChoice.slice(1)} (Bot)] [${user.money - bet} Lambies]`
            }
        })
        .catch(err => {
            console.log(`[ERR] ${err.message}`)
        })
};

const getRouletteResult = (playerChoice) => {
    let redCircle = '🔴',
    blackCircle = '⚫',
    colorsArr = [blackCircle, redCircle],
    notEmojiColorsArr = ['black', 'red'],
    count = Math.floor(Math.random() * 25),
    lastColor = '',
    newMessage = '';

    for (let i = 0; i < count; i++) {
        if (i == 0) {
            newMessage = colorsArr[i % colorsArr.length];
            lastColor = notEmojiColorsArr[i % colorsArr.length];
            continue;
        }
        newMessage += colorsArr[i % colorsArr.length];
        lastColor = notEmojiColorsArr[i % colorsArr.length];
    };

    let rouletteGameObj = {
        newMessage: newMessage,
        lastColor: lastColor
    };

    if (playerChoice == lastColor) rouletteGameObj.result = 'won';
    else rouletteGameObj.result = 'lost';

    return rouletteGameObj;
};

export {
    verifyBetAmount,
    deductBet,
    returnBet,
    addWinnings,
    getRpsResult,
    getRouletteResult
}