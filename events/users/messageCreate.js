const { Events } = require('discord.js');
const econHandler = require('../../methods/economyHandler.js');

const {PER_MESSAGE_POINTS} = require('../../data/economy/econSettings.json');

module.exports = {
	name: Events.MessageCreate,
	async execute(client, message) {
        // Checks if the message is from a user and not a bot or from the system.
        if (!message.member)
            return;
        if (message.member.user.bot)
            return;

        // Add points to the ricebot database
        try {
            const member = message.member;
            let econUser = econHandler.findUser(member.user.id);

            if (!econUser){
                econHandler.addUser(member.user);
                econHandler.saveEconData();
                econUser = econHandler.findUser(member.user.id);
                if (!econUser)
                    return;
            }

            econHandler.addPoints(member.user.id, PER_MESSAGE_POINTS);
            econHandler.saveEconData();
            console.log(`messageCreate: ${econUser.id} now has ${econUser.balance}`);
        }catch(err){
            console.log("[ERROR] messageCreate error");
            console.log(err);
        }

        // Check to see if the message contains a mention of the Ricebot
        
	},

    // TODO: Implement openAI API
    openAI(message){

    },
};
