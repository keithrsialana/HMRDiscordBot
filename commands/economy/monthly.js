const { SlashCommandBuilder } = require("discord.js");
const econHandler = require('../../methods/economyHandler.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("monthly")
        .setDescription("Get your monthly 400 Ricebot points!"),

    async execute(interaction, client) {
        const user = interaction.member.user;
        let econUser = econHandler.findUser(user.id);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        try {
            if (!econUser)
                econHandler.addUser(user);

            econUser = econHandler.economy.economyData.find(x => x.id == user.id);
            if (econUser) {
                // If there is no record of monthly date, OR if the lastMonthly date IS MORE THAN lastMonthly + a month in miliseconds
                if (econUser.lastMonthly == null || Date.parse(econUser.lastMonthly) >= Date.parse(econUser.lastMonthly) + 2629800000) {
                    econUser.lastMonthly = today;
                    econHandler.addPoints(econUser.id, 400);
                    await interaction.reply({ content: "You claimed your monthly 400 points! Run this command again next month for 400 more!" });
                } else {
                    await interaction.reply("You have already claimed your monthly 400 this month! Try again next month");
                }
            }
            else {
                console.log("Could not find user to add monthly points");
            }
        } catch (error) {
            await interaction.reply({ content: "There was a problem with adding your points: " + error, ephemeral: true });
        }

    }
}