const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('flip')
    .setDescription('Toss a coin!'),

    async execute(interaction, client) {

        const rNumber = Math.floor(Math.random() * 10000);
        const result = rNumber % 2;

        await interaction.reply({content:`You flipped a ${result == 0 ? 'Head':'Tails'}!`});
    },
};