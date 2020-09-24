import { adjustUserObj, checkTwitchChat, getNeededXp } from '../../util/functions/chatFunctions';
import { COMMANDS_COLLECTION, PREFIX } from '../../util/constants/chatConstants';
const mongoose = require('mongoose');
const User = require('../../models/user');

module.exports = async (client, channel, userstate, message, self) => {
    let adjustedUserstate = adjustUserObj(userstate);
    checkTwitchChat(userstate, message, channel, client, adjustedUserstate);
    if (self) return;
    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    try {
        if (message.startsWith(PREFIX)) {
            let commandFile = COMMANDS_COLLECTION.get(command);
            if (commandFile) {
                commandFile.run(client, channel, userstate, message, self, args, adjustedUserstate)
            }
        } else {
            let lambiesToAdd = Math.ceil(Math.random() * 5);
            console.log(lambiesToAdd + " lambies")
            let xpToAdd = Math.ceil(Math.random() * 25);
            console.log(xpToAdd + " xp")

            User
                .findOne({ twitch_id: userstate['user-id'] }, (err, user) => {
                    if (err) console.log(`[ERR] ${err.message}`)
                    else if (!user) {
                        const newUser = new User({
                            _id: mongoose.Types.ObjectId(),
                            twitch_id: userstate['user-id'],
                            channel_name: userstate.username,
                            display_name: userstate['display-name'],
                            money: lambiesToAdd,
                            xp: xpToAdd,
                            level: 1
                        })
                        newUser.save().catch(err => console.log(`[ERR] ${err.message}`))
                    } else {
                        user.money += lambiesToAdd;
                        user.xp += xpToAdd
                        const xpNeeded = getNeededXp(user.level)
                        if (user.xp >= xpNeeded){
                            user.level++,
                            user.xp -= xpNeeded
                            client.say(channel, `${user.display_name}, you are now level ${user.level} with ${user.xp}xp`)
                        };
                        user.save().catch(err => console.log(`[ERR] ${err.message}`))
                    }
                })
        }
    } catch (e) {
        console.log(`[ERR] ${e.message}`);
    };
};