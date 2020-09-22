import { writeFileSync } from 'fs';

const addWinnings = (amount, bank, userstate) => {
    let newBank = bank;
    newBank[userstate['user-id']].money += (Number(amount) * 2);
    writeFileSync('./src/util/bank.json', JSON.stringify(newBank, null, 2), (err) => {
        if (err) console.log(`[ERR] ${err.message}`)
    });
};

const returnBet = (amount, bank, userstate) => {
    let newBank = bank;
    newBank[userstate['user-id']].money += Number(amount)
    writeFileSync('./src/util/bank.json', JSON.stringify(newBank, null, 2), (err) => {
        if (err) console.log(`[ERR] ${err.message}`)
    });
};


const deductBet = (amount, bank, userstate) => {
    let newBank = bank;
    newBank[userstate['user-id']].money -= Number(amount);
    writeFileSync('./src/util/bank.json', JSON.stringify(newBank, null, 2), (err) => {
        if (err) console.log(`[ERR] ${err.message}`)
    });
};

const verifyBankAccount = (bank, userstate) => {
    let newBank = bank;
    if (!newBank[userstate['user-id']]) {
        newBank[userstate['user-id']] = {
            money: 100
        };
    } else if (newBank[userstate['user-id']].money < 1) {
        newBank[userstate['user-id']] = {
            money: 100
        };
    } else return;
    writeFileSync('./src/util/bank.json', JSON.stringify(newBank, null, 2), (err) => {
        if (err) console.log(`[ERR] ${err.message}`)
    })
}

const verifyBetAmount = (amount, bank, userstate) => {
    if (amount > bank[userstate['user-id']].money) return false;
    else return true;
}

const getRpsResult = (bank, userstate, bet, userChoice) => {
    const chooseArr = ['rock', 'paper', 'scissors'];
    userChoice = userChoice.toLowerCase();
    let clientChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
    
    if (
        (userChoice === "rock" && clientChoice === "scissors") ||
        (userChoice === "paper" && clientChoice === "rock") ||
        (userChoice === "scissors" && clientChoice === "paper")
    ) {
        addWinnings(bet, bank, userstate);
        return `${userstate.username}, you won! [${userChoice.slice(0, 1).toUpperCase() + userChoice.slice(1)} (You) -VS- ${clientChoice.slice(0,1).toUpperCase() + clientChoice.slice(1)} (Bot)] [${bank[userstate['user-id']].money} Lambies]`
    } else if (userChoice === clientChoice) {
        returnBet(bet, bank, userstate);
        return `${userstate.username}, it's a tie! [${userChoice.slice(0, 1).toUpperCase() + userChoice.slice(1)} (You) -VS- ${clientChoice.slice(0,1).toUpperCase() + clientChoice.slice(1)} (Bot)] [${bank[userstate['user-id']].money} Lambies]`
    } else {
        return `${userstate.username}, you lost! [${userChoice.slice(0, 1).toUpperCase() + userChoice.slice(1)} (You) -VS- ${clientChoice.slice(0,1).toUpperCase() + clientChoice.slice(1)} (Bot)] [${bank[userstate['user-id']].money} Lambies]`
    }

}

export {
    verifyBankAccount,
    verifyBetAmount,
    deductBet,
    getRpsResult
}