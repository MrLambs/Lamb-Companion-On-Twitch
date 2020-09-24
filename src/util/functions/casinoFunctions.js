const mongoose = require('mongoose');
const User = require('../../models/user')

const addWinnings = (amount, userstate) => {
    try {
        User.findOne({ twitch_id: userstate['user-id'] })
            .then(curUser => {
                let newUser = new User({
                    ...curUser,
                    money: curUser.money += (amount * 2)
                });
                User.findOneAndUpdate({ twitch_id: curUser.twitch_id }, newUser, { new: true })
                    .then(res => {
                        console.log(`[LOGS] User has been updated in database`)
                        return res
                    })
            })
    } catch (err) {
        console.log(`[ERR] ${err.message}`)
    }
};

const returnBet = (amount, userstate) => {
    try {
        User.findOne({ twitch_id: userstate['user-id'] })
            .then(curUser => {
                let newUser = new User({
                    ...curUser,
                    money: curUser.money += amount
                });
                User.findOneAndUpdate({ twitch_id: curUser.twitch_id }, newUser, { new: true })
                    .then(res => {
                        console.log(`[LOGS] User has been updated in database`)
                        return res
                    })
            })
    } catch (err) {
        console.log(`[ERR] ${err.message}`)
    }

};

const deductBet = (amount, userstate) => {
    try {
        User.findOne({ twitch_id: userstate['user-id'] })
            .then(curUser => {
                let newUser = new User({
                    ...curUser,
                    money: curUser.money -= amount
                });
                User.findOneAndUpdate({ twitch_id: curUser.twitch_id }, newUser, { new: true })
                    .then(res => {
                        console.log(`[LOGS] User has been updated in database`)
                        return res
                    })
            })
    } catch (err) {
        console.log(`[ERR] ${err.message}`)
    }
};

const verifyBankAccount = (userstate) => {
    User
        .findOne({ twitch_id: userstate['user-id'] })
        .then(user => {
            if (!user) {
                let newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    twitch_id: userstate['user-id'],
                    channel_name: userstate.username,
                    display_name: userstate['display-name'],
                    money: 100
                });
                User.create(newUser)
                    .then(res => console.log(`[LOGS] New user added to database`))
                    .catch(err => console.log(`[ERR] ${err.message}`))
            } else {
                return;
            }
        })
}

const verifyBetAmount = (amount, userstate) => {
    let verified = false;
    return User
        .findOne({ twitch_id: userstate['user-id'] })
        .then(user => {
            if (amount <= user.money) return verified = true;
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
}

export {
    verifyBankAccount,
    verifyBetAmount,
    deductBet,
    getRpsResult,
}