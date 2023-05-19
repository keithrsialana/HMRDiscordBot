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
        let user = oldMember.guild.members.cache.get(oldMember.id).user; 
        if (user.bot)
            return;

        let econUser;
        try{
            econUser = econHandler.findUser(oldMember.id);
        }catch(err){
            console.log(`Something went wrong in voiceStateUpdate.js\n${err}`);
        }

        // Adds the user to the database if they don't exist yet
        if (!econUser){
            econHandler.addUser(user);
            econUser = econHandler.findUser(oldMember.id);
        }

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
        else if(oldMember.channel != null && newMember.channel == null){          
            try {
                // add points depending on how long the user stayed in that voice channel
                const now = Date.now();

                // Checks if the Joined Date and Time doesn't exist, exits as it will make a calculation error
            if (econUser.voiceJoinedAt == null)
                return;
            else{
                const timeDiff = now - econUser.voiceJoinedAt;
                
                if (timeDiff < 0){
                    econUser.voiceJoinedAt = null;
                    econHandler.saveEconData();
                    return;
                }

                if(econUser.voiceJoinedAt)
                    econUser.voiceJoinedAt = null;
                    econHandler.saveEconData();
                const seconds = timeDiff / 1000;

                if (seconds <= 0){
                    econUser.voiceJoinedAt = null;
                    econHandler.saveEconData();
                    return;
                }
                const pointsToAdd = Math.trunc(seconds * PER_SECOND_POINTS);

                if(pointsToAdd <= 0){
                    econUser.voiceJoinedAt = null;
                    econHandler.saveEconData();
                    return;
                }
                econHandler.addPoints(oldMember.id, pointsToAdd);
                console.log(`voiceStateUpdate: ${econUser.id} now has ${econUser.balance}`);
                return;
            }

            
            }catch(err){
                console.log("Could not update user's voiceJoinedAt attribute");
            }
        }
        else{
            console.log(`User ${oldMember.id} has connected to a Voice Channel`);
        }
    }
};
