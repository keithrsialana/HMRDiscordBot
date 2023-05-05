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
                const timeDiff = now - econUser.voiceJoinedAt;
                if(econUser.voiceJoinedAt)
                    econUser.voiceJoinedAt = null;
                const seconds = timeDiff / 1000;
                const pointsToAdd = Math.trunc(seconds * PER_SECOND_POINTS);

                econHandler.addPoints(oldMember.id, pointsToAdd);
                return;
            }catch(err){
                console.log("Could not update user's voiceJoinedAt attribute");
            }
        }
    }
};
