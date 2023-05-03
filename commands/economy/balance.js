const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");
const economyHandler = require("../../methods/economyHandler");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Find out what your rice points balance is"),

    async execute(interaction, client){
        const numberWithCommas = (number) => {
            // Convert the number to a string and use a regular expression to add commas every 3rd digit
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        const user = interaction.member.user;
        let econUser = economyHandler.findUser(user.id);

        let embed = new EmbedBuilder()
        .setTitle(`${user.username}'s balance`)
        .setDescription(`You have ${numberWithCommas(econUser.balance)} rice points!`);
        
        await interaction.reply({embeds: [embed]});
    }
}