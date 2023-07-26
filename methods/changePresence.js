const {ActivityType, PresenceData} = require('discord.js');

/*
 Status types: online, idle, invisible, dnd
 Activitity types: Listening, Competing, Watching, Playing, Streaming
 NOTE: Activitiy type 'Custom' is meant for non-bot users, will not work on Discord Bot.
*/

module.exports = {
    update(client, status, message, afk) {
        var data = {};

        data.status = status;
        data.afk = afk;
        data.activities = [{name: message, type: ActivityType.Listening}];

        try {
            client.user.setPresence(data);
            console.log(`Bot presence was changed to: "${message}"`);
        }catch(err){
            console.log(`Could not update presence: ${err}`);
        }
    },
    remove(client){
        var data = {};

        data.activities = [{name: "",type: null}];

        try {
            client.user.setPresence(data);
            console.log("Bot presence was removed.");
        }catch(err){
            console.log(`Could not update presence: ${err}`);
        }
    }
}