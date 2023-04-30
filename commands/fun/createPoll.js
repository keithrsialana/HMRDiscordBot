const { SlashCommandBuilder } = require('discord.js');
// TODO: Finish this
module.exports = {
    data: new SlashCommandBuilder()
    .setName('create-poll')
    .setDescription('Create a Poll!'),

    async execute(interaction, client) {

        await interaction.reply({

        });
    },
};