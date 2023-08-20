const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");
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
                eData.economyData.forEach(item => {
                    if (item.balance != null){
                        item.xp = item.balance;
                    }
                });
                economyHandler.saveEconData();
                await interaction.reply("Points transferred to XP");
            }catch(err){
                console.log(`[ERROR] Could not transfer points to xp\n ${err}`);
                await interaction.reply("Something went wrong, check the console.");
            }
        }
    }
}