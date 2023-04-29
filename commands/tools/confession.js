const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('confess')
    .setDescription('Write an anonymous confession')
    .addStringOption((option) =>
        option
        .setName('confession')
        .setDescription('Confession content')
        .setRequired(true)
    ),

    async execute(interaction, client) {
        // get the user input from options
        var confession = interaction.options._hoistedOptions[0].value
        await interaction.reply({content:`${confession}!`, ephemeral: false});
    },
};