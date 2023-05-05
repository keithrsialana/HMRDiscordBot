const { Events } = require('discord.js');
const econHandler = require('../../methods/economyHandler.js');

const {PER_MESSAGE_POINTS} = require('../../data/economy/econSettings.json');

module.exports = {
	name: Events.MessageCreate,
	async execute(client, message) {
        if (!message.member)
            return;
        if (message.member.user.bot)
            return;
        try {
            const member = message.member;
            let econUser = econHandler.findUser(member.user.id);

            if (!econUser){
                econHandler.addUser(member.user);
                econUser = econHandler.findUser(member.user.id);
                if (!econUser)
                    return;
            }

            econHandler.addPoints(member.user.id, PER_MESSAGE_POINTS);
        }catch(err){
            console.log("ERROR: messageCreate error");
            console.log(err);
        }
	},
};
