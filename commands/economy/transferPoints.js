const { SlashCommandBuilder } = require("discord.js");
const economyHandler = require('../../methods/economyHandler');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("tranfer_points")
    .setDescription("Transfer all points into xp")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction,client){
        var eData = economyHandler.getData();
        if (eData){
            try{
                eData.economyData.foreach(user => {
                    user.xp = user.balance;
                    economyHandler.saveEconData();
                });
                await interaction.reply("Points transfered to XP");
            }catch(err){
                console.log("Could not transfer points to xp");
                await interaction.reply("Something went wrong, check the console.");
            }
        }
    }
}