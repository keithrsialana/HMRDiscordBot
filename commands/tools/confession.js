const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, Embed } = require('discord.js');

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
        const embed = new EmbedBuilder()
        .setTitle("Confession")
        .setDescription(interaction.options.get("confession").value)
        .setColor('Purple')
        .setTimestamp(Date.now());
        var confession = interaction.options._hoistedOptions[0].value
        await interaction.reply({content:"Confession sent!", ephemeral: true});
        await interaction.channel.send({embeds:[embed], ephemeral: false});
    },
};