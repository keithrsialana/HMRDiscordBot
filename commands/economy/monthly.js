const { SlashCommandBuilder } = require("discord.js");
const econHandler = require('../../methods/economyHandler.js');
const {MONTHLY_POINTS} = require('../../data/economy/econSettings.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("monthly")
        .setDescription(`Get your monthly ${MONTHLY_POINTS.toLocaleString("en-US")} Ricebot points!`),

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
                const nextMonthly =  new Date(Date.parse(econUser.lastMonthly) + 2629800000);
                // If there is no record of monthly date, OR if the lastMonthly date IS MORE THAN lastMonthly + a month in miliseconds
                if (econUser.lastMonthly == null || Date.now() >= nextMonthly) {
                    econUser.lastMonthly = today;
                    econHandler.addPoints(econUser.id, MONTHLY_POINTS);
                    econHandler.saveEconData();
                    console.log(`monthly: ${econUser.id} now has ${econUser.balance}`);
                    await interaction.reply({ content: `You claimed your monthly ${MONTHLY_POINTS.toLocaleString("en-US")} points! Run this command again next month for ${MONTHLY_POINTS.toLocaleString("en-US")} more!` });
                } else {
                    await interaction.reply(`You have already claimed your monthly ${MONTHLY_POINTS.toLocaleString("en-US")} this month! Try again in **${nextMonthly.toDateString()}**`);
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