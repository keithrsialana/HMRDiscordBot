const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");
const economyHandler = require("../../methods/economyHandler");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Find out what your rice points balance is")
    .addMentionableOption(option => option
        .setName("user")
        .setDescription("The user you want to check the balance of")
        .setRequired(false)
        )
    ,

    async execute(interaction, client){
        // interaction.options.get("user") returns an object that isn't in any Documentations. Check stringified JSON on the object
        const mentionedUser = interaction.options.get("user") ? interaction.options.get("user") : null;
        const numberWithCommas = (number) => {
            // Convert the number to a string and use a regular expression to add commas every 3rd digit
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

        const user = mentionedUser ? mentionedUser : interaction.member;
        let econUser = economyHandler.findUser(user.user.id);
        if (!econUser){
            economyHandler.addUser(user.user);
            economyHandler.saveEconData();
            econUser = economyHandler.findUser(user.user.id);
            if (!econUser)
                return;
        }

        let embed = new EmbedBuilder()
        .setTitle(`${user.nickname ? user.nickname : user.user.username}'s balance`)
        .setDescription(`${mentionedUser ? (user.nickname ? user.nickname : user.user.username):'You'} ${mentionedUser ? 'has':'have'} ${numberWithCommas(econUser.balance)} rice points!`);

        await interaction.reply({embeds: [embed]});
    }
}