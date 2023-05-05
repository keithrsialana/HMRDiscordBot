const { SlashCommandBuilder } = require("discord.js");
const econHandler = require('../../methods/economyHandler.js');
const {DAILY_POINTS} = require('../../data/economy/econSettings.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Get your daily 20 Ricebot points!"),

    async execute(interaction, client) {
        const user = interaction.member.user;
        let econUser = econHandler.findUser(user.id);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        try{
            if (!econUser)
                econHandler.addUser(user);
                
            econUser = econHandler.economy.economyData.find(x => x.id == user.id);
            if(econUser){
                if(econUser.lastDaily == null || Date.parse(econUser.lastDaily) < Date.parse(today)){
                    econUser.lastDaily = today;
                    econHandler.addPoints(econUser.id, DAILY_POINTS);
                    await interaction.reply({content: `You claimed your ${DAILY_POINTS} points! Run this command again tomorrow for ${DAILY_POINTS} more!`});
                }else{
                    await interaction.reply(`You have already claimed your daily ${DAILY_POINTS} points today!`);
                }
            }
            else{
                console.log("Could not find user to add daily points");
            }
        }catch (error){
            await interaction.reply({content: "There was a problem with adding your points: " + error, ephemeral: true});
        }

    }
}