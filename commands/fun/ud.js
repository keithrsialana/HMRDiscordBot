const { SlashCommandBuilder, ApplicationCommandOptionType } = require('discord.js');
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('search-ud')
    .setDescription('Look for the definition of a word in the Urban Dicitonary')
    .addStringOption((option) =>
        option
        .setName('word')
        .setDescription('The word that will be looked up')
        .setRequired(true)
    ),

    async execute(interaction, client) {

        await interaction.reply({
            content: `${data.toJSON()}`
        });
    },
};