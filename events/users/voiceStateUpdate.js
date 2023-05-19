const { Events } = require('discord.js');
const econHandler = require('../../methods/economyHandler.js');
const {PER_SECOND_POINTS} = require('../../data/economy/econSettings.json');

module.exports = {
	name: Events.VoiceStateUpdate,

    // PARAMETERS
    // client: client object
    // oldMember: VoiceState object
    // newMember: VoiceState object
	async execute(client, oldMember, newMember) {
        // check if it is not a bot
        if(!econHandler.findUser(oldMember.id) && !econHandler.findUser(newMember.id))
            return;

        let econUser = econHandler.findUser(oldMember.id);
        // check if user joined a voice channel
            // Specific to users who joined a channel
        if(oldMember.channel == null && newMember.channel){
            if(econUser.voiceJoinedAt == null)
                econUser.voiceJoinedAt = Date.now();
            try {
                econHandler.saveEconData();
                return;
            }catch(err){
                console.log("Could not update user's voiceJoinedAt attribute");
            }
        }

        // check if user left a voice channel
        if(oldMember.channel && newMember.channel == null){
            
            try {
                // add points depending on how long the user stayed in that voice channel
                const now = Date.now();

            if (econUser.voiceJoinedAt == null)
                econUser.voiceJoinedAt = 0;
            // WATCH
            console.log(`--------------------------------\n\tNow: ${now}`);
                const timeDiff = now - econUser.voiceJoinedAt;
            // WATCH
            console.log(`\ttimeDiff: ${now} - ${econUser.voiceJoinedAt} = ${timeDiff}`);
                if (timeDiff < 0)
                    return;
                if(econUser.voiceJoinedAt)
                    econUser.voiceJoinedAt = null;
                const seconds = timeDiff / 1000;
            // WATCH
            console.log(`\tseconds: ${timeDiff} / 1000 = ${seconds}`);
                if (seconds <= 0)
                    return;
                const pointsToAdd = Math.trunc(seconds * PER_SECOND_POINTS);
            // WATCH
            console.log(`\tpointsToAdd: Math.trunc(${seconds} * ${PER_SECOND_POINTS}) = ${pointsToAdd}\n--------------------------------`);
                if(pointsToAdd <= 0)
                    return;
                econHandler.addPoints(oldMember.id, pointsToAdd);
                console.log(`voiceStateUpdate: ${econUser.id} now has ${econUser.balance}`);
                return;
            }catch(err){
                console.log("Could not update user's voiceJoinedAt attribute");
            }
        }
    }
};
