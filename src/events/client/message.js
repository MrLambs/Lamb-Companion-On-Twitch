import { adjustUserObj, checkTwitchChat } from '../../util/functions/chatFunctions';
import { COMMANDS_COLLECTION, PREFIX } from '../../util/constants/chatConstants';

module.exports = async (client, channel, userstate, message, self) => {
    let adjustedUserstate = adjustUserObj(userstate);
    checkTwitchChat(userstate, message, channel, client, adjustedUserstate);
    if (self || !message.startsWith(PREFIX)) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    try {
        let commandFile = COMMANDS_COLLECTION.get(command);
        if (commandFile) {
            commandFile.run(client, channel, userstate, message, self, args, adjustedUserstate)
        }
    } catch (e) {
        console.log(`[ERR] ${e.message}`);
    };
};