const { SlashCommandBuilder } = require("discord.js");
const econHandler = require('../../methods/economyHandler.js');
const {DAILY_POINTS, GENERAL_CHAT_ID} = require('../../data/economy/econSettings.json');
const {botName} = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription(`Get your daily ${DAILY_POINTS.toLocaleString("en-US")} ${botName} points!`),

    async execute(interaction, client) {
        const user = interaction.member.user;
        const guildUser = interaction.member;
        let econUser = econHandler.findUser(user.id);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        try{
            if (!econUser)
                econHandler.addUser(guildUser);
                
            econUser = econHandler.economy.economyData.find(x => x.id == user.id);
            if(econUser){
                if(econUser.lastDaily == null || Date.parse(econUser.lastDaily) < Date.parse(today)){
                    econUser.lastDaily = today;
                    econHandler.addPoints(econUser.id, DAILY_POINTS);
                    econHandler.saveEconData();
                    if(!interaction.channel.id == GENERAL_CHAT_ID)
                        await interaction.reply({content: `You claimed your ${DAILY_POINTS.toLocaleString("en-US")} points! Run this command again tomorrow for ${DAILY_POINTS.toLocaleString("en-US")} more!`});
                    else
                        await interaction.reply({content: `You claimed your ${DAILY_POINTS.toLocaleString("en-US")} points! Run this command again tomorrow for ${DAILY_POINTS.toLocaleString("en-US")} more!`, ephemeral: true});
                }else{
                    await interaction.reply(`You have already claimed your daily ${DAILY_POINTS.toLocaleString("en-US")} points today!`);
                }
            }
            else{
                console.log("[ERROR] Could not find user to add daily points");
            }
        }catch (error){
            await interaction.reply({content: "There was a problem with adding your points: " + error, ephemeral: true});
        }

    }
}