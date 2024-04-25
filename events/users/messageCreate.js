const { Events } = require('discord.js');
const econHandler = require('../../methods/economyHandler.js');
const { msgLogger } = require('../../config.json');
const { PER_MESSAGE_POINTS } = require('../../data/economy/econSettings.json');
const fileHandler = require('../../methods/myFileHandler.js');

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
            // economy
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

            // msg logger
            if (msgLogger == true) {
                this.logMessage(message.channel, message.author, message.content);
            }

        }catch(err){
            console.log("[ERROR] messageCreate error");
            console.log(err);
        }

        // Check to see if the message contains a mention of the Ricebot
        
    },

    async logMessage(channel, user, message) {
        try {
            const realDate = fileHandler.getRealDate();
            const currentDate = fileHandler.getDate();
            const filePath = `./chatlogs/${realDate.year}/${realDate.month}-${realDate.year}/`;
            const fileName = filePath + currentDate + '.log';
            if (fileHandler.pathExists(filePath))
            {
                let content = ""
                if (fileHandler.fileExists(fileName) == true) {
                    content = fileHandler.load(fileName);
                }
                content = content + `[${fileHandler.getTime()}] : [${user.username}] : [${channel.name}] : ${message} \n`;
                fileHandler.save(fileName, content);
            }
        } catch (err){
            //console.log(`[ERROR] There was a problem logging a message: ${err}`);
            return;
        }
    },

    // TODO: Implement openAI API
    openAI(message){

    },
};
